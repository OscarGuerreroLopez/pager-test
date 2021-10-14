import { Alert as AlertType, ProcessedAlert } from "./entities/types";
import { Timer } from "../entities/types";
import { AlertUseCase } from "./entities/interfaces";
import {
  ID,
  SmsPort,
  TimerPort
} from "../../pager-service/entities/interfaces";

import { MailPort } from "../mail/entities/interfaces";

import { EscalationPort } from "../escalation/entities/interfaces";

import { PersistanceRepository } from "../persistance/entities/interfaces";

import { MailSender, SmsSender } from "../common";
import { VerifyAlert } from "./verifyAlert";

abstract class Alert implements AlertUseCase {
  protected id: ID;
  protected escalationAdapter: EscalationPort;
  protected mailAdapter: MailPort;
  protected smsAdapter: SmsPort;
  protected timerAdapter: TimerPort;
  protected persistanceRepo: PersistanceRepository;

  constructor(
    id: ID, // id maker injected to make ids
    escalationAdapter: EscalationPort, // Escalation implementation injected to get the escalation policy
    mailAdapter: MailPort, // mail implementation injected
    smsAdapter: SmsPort, // sms implementation injected
    timerAdapter: TimerPort, // timer implementation so we can send the timer event after the alert comes
    persistanceRepo: PersistanceRepository // persistance implementation to keep track of the alerts
  ) {
    this.id = id;
    this.escalationAdapter = escalationAdapter;
    this.mailAdapter = mailAdapter;
    this.smsAdapter = smsAdapter;
    this.timerAdapter = timerAdapter;
    this.persistanceRepo = persistanceRepo;
  }

  async newAlert(alert: AlertType): Promise<ProcessedAlert> {
    // the alerting service, which resides outside the domain, does not assign the id, so we do it here
    alert.id = this.id.makeId();
    // here we get the escalation policy for this particular service
    // this is an external service or adapter that gets injected into this use case
    const escalation = await this.escalationAdapter.getEscalation(
      alert.serviceId
    );

    const verifiedAlert = VerifyAlert(alert);

    // make sure there are targets
    const areThereTargets = escalation.levels[0] && escalation.levels[0].target;

    if (areThereTargets) {
      const isThereMailLevel = escalation.levels[0]?.target?.email || null; // mail targets?
      const isThereSmsLevel = escalation.levels[0]?.target?.sms || null; //sms targets?
      const message = `${verifiedAlert.message} serviceID: ${verifiedAlert.serviceId} status: ${verifiedAlert.status}`;

      if (isThereMailLevel) {
        await MailSender(this.mailAdapter.sendMail, isThereMailLevel, message);
      }

      if (isThereSmsLevel) {
        await SmsSender(this.smsAdapter.sendSms, isThereSmsLevel, message);
      }

      const timer: Timer = {
        alert: alert,
        ep: escalation,
        alertLevel: 0,
        date: new Date()
      };

      await this.timerAdapter.sendTimer(timer);

      await this.persistanceRepo.storeAlert(timer);

      return { id: alert.id, processed: true };
    }

    return { id: alert.id, processed: false };
  }
}

export default Alert;
