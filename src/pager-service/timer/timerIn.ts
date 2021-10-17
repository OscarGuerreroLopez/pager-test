import { TimerInUseCase } from "./entities/interfaces";
import { SmsPort } from "../sms/entities/interfaces";
import { MailPort } from "../mail/entities/interfaces";
import { TimerPort } from "./entities/interfaces";
import { PersistanceRepository } from "../persistance/entities/interfaces";
import { TimerEvent, TimerTransResult } from "./entities/types";

import { MailSender, SmsSender } from "../common";

class TimerIn implements TimerInUseCase {
  protected mailAdapter: MailPort;
  protected smsAdapter: SmsPort;
  protected persistanceRepo: PersistanceRepository;
  protected timerAdapter: TimerPort;

  constructor(
    mailAdapter: MailPort,
    smsAdapter: SmsPort,
    persistanceRepo: PersistanceRepository,
    timerAdapter: TimerPort
  ) {
    this.mailAdapter = mailAdapter;
    this.smsAdapter = smsAdapter;
    this.persistanceRepo = persistanceRepo;
    this.timerAdapter = timerAdapter; // timer implementation so we can send the timer event after the alert comes
  }

  async getTimerEvent(timer: TimerEvent): Promise<TimerTransResult> {
    const pagerEvent = await this.persistanceRepo.getAlert(timer.alertId);
    console.log("@@@111", timer);

    if (pagerEvent.acknowledged) {
      return true;
    }

    if (pagerEvent.alert.status === "healthy") {
      return true;
    }

    const epLevelslength = pagerEvent.ep.levels.length;

    const nextAlertLevel = pagerEvent.alertLevel + 1;

    // if there are no more levels to inform then exit
    if (nextAlertLevel < epLevelslength) {
      const mailTargets =
        pagerEvent.ep.levels[nextAlertLevel].target.email || null;

      const smsTargets =
        pagerEvent.ep.levels[nextAlertLevel].target.sms || null;

      const message = `${pagerEvent.alert.message} serviceID: ${pagerEvent.alert.serviceId} status: ${pagerEvent.alert.status}`;

      if (mailTargets) {
        console.log("@@@222", mailTargets);

        await MailSender(this.mailAdapter.sendMail, mailTargets, message);
      }

      if (smsTargets) {
        console.log("@@@333", smsTargets);

        await SmsSender(this.smsAdapter.sendSms, smsTargets, message);
      }

      await this.timerAdapter.sendTimer({
        ...timer,
        alertedLevel: nextAlertLevel
      });

      await this.persistanceRepo.updateAlert(timer.alertId, nextAlertLevel);

      return true;
    }

    return false;
  }
}

export default TimerIn;

/*
    const areThereLevels = timer.ep.levels[timer.alertLevel]?.target || null;

    const isServiceStillUnhealthy = timer.alert.status === "unhealthy";

    if (areThereLevels && timer.alert.id && isServiceStillUnhealthy) {
      console.log(
        "@@@111",
        await this.persistanceRepo.getAlert(timer.alert.id)
      );
      console.log("@@@222", timer);

      const isThereMailLevel =
        timer.ep.levels[timer.alertLevel].target.email || null;
      const isThereSmsLevel =
        timer.ep.levels[timer.alertLevel].target.sms || null;
      const message = `${timer.alert.message} serviceID: ${timer.alert.serviceId} status: ${timer.alert.status}`;

      if (isThereMailLevel) {
        await MailSender(this.mailAdapter.sendMail, isThereMailLevel, message);
      }

      if (isThereSmsLevel) {
        await SmsSender(this.smsAdapter.sendSms, isThereSmsLevel, message);
      }

      await this.persistanceRepo.updateAlert(timer.alert.id, timer.alertLevel);
      return true;
    }
*/
