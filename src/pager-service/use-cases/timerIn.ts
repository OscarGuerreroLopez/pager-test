import {
  SmsPort,
  TimerInUseCase,
  PersistanceRepository
} from "../entities/interfaces";
import { MailPort } from "../mail/entities/interfaces";
import { Timer as TimerType, TimerTransResult } from "../entities/types/";

import { MailSender, SmsSender } from "../common";

class TimerIn implements TimerInUseCase {
  protected mailAdapter: MailPort;
  protected smsAdapter: SmsPort;
  protected persistanceRepo: PersistanceRepository;

  constructor(
    mailAdapter: MailPort,
    smsAdapter: SmsPort,
    persistanceRepo: PersistanceRepository
  ) {
    this.mailAdapter = mailAdapter;
    this.smsAdapter = smsAdapter;
    this.persistanceRepo = persistanceRepo;
  }

  async getTimerEvent(timer: TimerType): Promise<TimerTransResult> {
    const areThereLevels = timer.ep.levels[timer.alertLevel]?.target || null;

    if (areThereLevels) {
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

      await this.persistanceRepo.storeAlert(timer);
      return true;
    }

    return false;
  }
}

export default TimerIn;
