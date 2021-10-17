import { Alert as AlertType, ProcessedAlert } from "./entities/types";
import { TimerEvent } from "../timer/entities/types";
import { PagerEvent } from "../persistance/entities/types";
import { AlertUseCase } from "./entities/interfaces";
import { EscalationPort } from "../escalation/entities/interfaces";
import { PersistanceRepository } from "../persistance/entities/interfaces";
import { MailPort } from "../mail/entities/interfaces";
import { TimerPort } from "../timer/entities/interfaces";
import { SmsPort } from "../sms/entities/interfaces";

import { ID } from "../../pager-service/utils";
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

    // get all the alerts for that service that are not healthy
    // if there are some unhealthy that means the service has been reported already
    const getAlertsRelatedToService =
      await this.persistanceRepo.getAlertByServiceAndStatus(
        alert.serviceId,
        "unhealthy"
      );
    // if the service has been reported as unhealthy already then don't do anything
    if (getAlertsRelatedToService.length !== 0) {
      return {
        id: alert.id,
        processed: false,
        reason: "This service is already flagged as unhealthy"
      };
    }

    // here we get the escalation policy for this particular service
    // this is an external service or adapter that gets injected into this use case
    const escalation = await this.escalationAdapter.getEscalation(
      alert.serviceId
    );

    // little dummy validation that perhaps is not necessary cause typescript
    const verifiedAlert = VerifyAlert(alert);

    // make sure there are targets
    const areThereTargets = escalation.levels[0] && escalation.levels[0].target;

    if (areThereTargets) {
      const mailTargets = escalation.levels[0]?.target?.email || null; // mail targets?
      const smsTargets = escalation.levels[0]?.target?.sms || null; //sms targets?
      const message = `${verifiedAlert.message} serviceID: ${verifiedAlert.serviceId} status: ${verifiedAlert.status}`;

      if (mailTargets) {
        await MailSender(this.mailAdapter.sendMail, mailTargets, message);
      }

      if (smsTargets) {
        await SmsSender(this.smsAdapter.sendSms, smsTargets, message);
      }

      // create a new event to be stored
      const pagerEvent: PagerEvent = {
        alert: alert,
        ep: escalation,
        alertLevel: 0, // since this service receives the alerts from the services, it will always be the first one
        date: new Date("2021-10-16T16:23:05.276Z"),
        delay: 900000,
        acknowledged: false
      };

      // create a new timer event to be send to the timer service
      const timer: TimerEvent = {
        alertId: alert.id,
        alertedLevel: 0, // since this service receives the alerts from the services, it will always be the first one
        time: new Date("2021-10-16T16:23:05.276Z"),
        delay: 900000
      };

      await this.timerAdapter.sendTimer(timer); // we send the alert to the timer service and that services decides what to do

      await this.persistanceRepo.storeAlert(pagerEvent); // we are keeping the alert in our storage for later analysis

      return { id: alert.id, processed: true };
    }

    return { id: alert.id, processed: false, reason: "No targets" };
  }
}

export default Alert;
