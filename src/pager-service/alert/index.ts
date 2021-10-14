import { Alert as AlertType, ProcessedAlert } from "./entities/types";
import { Timer } from "../entities/types";
import { AlertUseCase } from "./entities/interfaces";
import {
  ID,
  EscalationPort,
  MailPort,
  SmsPort,
  TimerPort,
  PersistanceRepository
} from "../entities/interfaces";

import { MailSender, SmsSender } from "../common";

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

  private async verifyAlert(alert: AlertType): Promise<AlertType> {
    // Basic text to make sure that the alert comes with everything we need,
    // in a real prod app obviously this would be more elavorated
    // just to prove the point
    // we just through errors, the services that use this case should handle the exceptions
    // by using a typescript interface this should not happen but just in case we should
    // do a validation to make sure everything we need comes
    if (!alert.message) {
      throw new Error("Missing message from alert");
    }

    if (!alert.serviceId) {
      throw new Error("Missing serviceId from alert");
    }

    if (!alert.status) {
      throw new Error("Missing status from alert");
    }

    return alert;
  }

  async newAlert(alert: AlertType): Promise<ProcessedAlert> {
    // the alerting service, which resides outside the domain, does not assign the id, so we do it here
    alert.id = this.id.makeId();
    // here we get the escalation policy for this particular service
    // this is an external service or adapter that gets injected into this use case
    const escalation = await this.escalationAdapter.getEscalation(
      alert.serviceId
    );

    const verifiedAlert = await this.verifyAlert(alert);

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
