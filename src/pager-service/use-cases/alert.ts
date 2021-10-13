import { Alert as AlertType, ProcessedAlert, Timer } from "../entities/types";
import {
  AlertUseCase,
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
    id: ID,
    escalationAdapter: EscalationPort,
    mailAdapter: MailPort,
    smsAdapter: SmsPort,
    timerAdapter: TimerPort,
    persistanceRepo: PersistanceRepository
  ) {
    this.id = id;
    this.escalationAdapter = escalationAdapter;
    this.mailAdapter = mailAdapter;
    this.smsAdapter = smsAdapter;
    this.timerAdapter = timerAdapter;
    this.persistanceRepo = persistanceRepo;
  }

  private async verifyAlert(event: AlertType): Promise<AlertType> {
    if (!event.message) {
      throw new Error("Missing message from alert");
    }

    if (!event.serviceId) {
      throw new Error("Missing serviceId from alert");
    }

    if (!event.status) {
      throw new Error("Missing status from alert");
    }

    if (!event.id) {
      event.id = this.id.makeId();
    }

    event.message = `***${event.message}***`;

    return event;
  }

  async newAlert(alert: AlertType): Promise<ProcessedAlert> {
    alert.id = this.id.makeId();
    const escalation = await this.escalationAdapter.getEscalation(
      alert.serviceId
    );

    const verifiedAlert = await this.verifyAlert(alert);

    const areThereLevels = escalation.levels[0] && escalation.levels[0].target;

    if (areThereLevels) {
      const isThereMailLevel = escalation.levels[0]?.target?.email || null;
      const isThereSmsLevel = escalation.levels[0]?.target?.sms || null;
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
