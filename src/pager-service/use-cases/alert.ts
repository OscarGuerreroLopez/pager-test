import { Alert as AlertType, ProcessedAlert, Mail } from "../entities/types";
import {
  AlertUseCase,
  ID,
  EscalationPort,
  MailPort,
  SmsPort
} from "../entities/interfaces";

abstract class Alert implements AlertUseCase {
  protected id: ID;
  protected escalationAdapter: EscalationPort;
  protected mailAdapter: MailPort;
  protected smsAdapter: SmsPort;

  constructor(
    id: ID,
    escalationAdapter: EscalationPort,
    mailAdapter: MailPort,
    smsAdapter: SmsPort
  ) {
    console.log("@@@ consturctor in Alert UseCase");
    this.id = id;
    this.escalationAdapter = escalationAdapter;
    this.mailAdapter = mailAdapter;
    this.smsAdapter = smsAdapter;
  }

  private async verifyAlert(event: AlertType): Promise<AlertType> {
    console.log("@@@ AlertUseCase verifying alert at the use case");

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

    console.log(
      "@@@ Modifying alert inside verifyAlert in alertUseCase",
      event
    );

    return event;
  }

  async newAlert(alert: AlertType): Promise<ProcessedAlert> {
    console.log("@@@ newAlert in Alert UseCase", alert);
    alert.id = this.id.makeId();
    const escalation = await this.escalationAdapter.getEscalation(
      alert.serviceId
    );
    console.log(
      "@@@ escalation in newAlert in Alert UseCase",
      escalation.levels[0]
    );

    const verifiedAlert = await this.verifyAlert(alert);

    const email: Mail = {
      to: "user@user.com",
      from: "system@system.com",
      message: `${verifiedAlert.message} serviceID: ${verifiedAlert.serviceId} status: ${verifiedAlert.status}`
    };

    await this.mailAdapter.sendMail(email);

    return { id: alert.id, processed: true };
  }
}

export default Alert;
