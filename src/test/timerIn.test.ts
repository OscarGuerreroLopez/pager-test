import { TimerEvent } from "../pager-service/timer/entities/types";
import TimerInUseCase from "../pager-service/timer/timerIn";
import Mail from "./mocks/mailAdapter";
import Sms from "./mocks/smsAdapter";
import Persistance from "./mocks/persistanceAdapter";
import Timer from "./mocks/timerOutAdapter";
import {
  PagerlevelZeroUnhealthy,
  PagerAlertAcknoledged,
  PagerlevelOneHealthy,
  NoMoreLevels
} from "./mocks/pagerGenerator";
import { Mail as MailType } from "../pager-service/mail/entities/types";
import { Sms as SmsType } from "../pager-service/sms/entities/types";
import { PagerEvent } from "src/pager-service/persistance/entities/types";

const timerEvent: TimerEvent = {
  alertId: "2cf959e7-928a-49a2-8c5e-76c400b9f34f",
  alertedLevel: 0,
  time: new Date(),
  delay: 900000
};

const mail = new Mail();
const sms = new Sms();
const persistanceAdapter = new Persistance();
const timer = new Timer();

const timerInUseCase = new TimerInUseCase(mail, sms, persistanceAdapter, timer);

// here, instead of using the timerin adapter I decided to test the
// use case directly, cause the other inbound adapters are tested directly
describe("TimerInUseCase", () => {
  let spy:
    | jest.Mock<any, any>
    | jest.SpyInstance<Promise<boolean>, [timer: TimerEvent]>;
  let spyMail:
    | jest.Mock<any, any>
    | jest.SpyInstance<Promise<boolean>, [mail: MailType]>;
  let spySms:
    | jest.Mock<any, any>
    | jest.SpyInstance<Promise<boolean>, [sms: SmsType]>;
  let spyPersistance:
    | jest.Mock<any, any>
    | jest.SpyInstance<Promise<PagerEvent>, [alertId: string]>;
  let spyPersistanceUpdate:
    | jest.Mock<any, any>
    | jest.SpyInstance<
        Promise<boolean>,
        [alertId: string, alert: IObjectLiteral]
      >;
  let spyTimer:
    | jest.Mock<any, any>
    | jest.SpyInstance<Promise<boolean>, [timer: TimerEvent]>;

  beforeEach(() => {
    spy = jest.fn();
    spy = jest.spyOn(timerInUseCase, "processTimerEvent");
    spyMail = jest.fn();
    spyMail = jest.spyOn(mail, "sendMail");
    spySms = jest.fn();
    spySms = jest.spyOn(sms, "sendSms");
    spyTimer = jest.fn();
    spyTimer = jest.spyOn(timer, "sendTimer");
    spyPersistanceUpdate = jest.fn();
    spyPersistanceUpdate = jest.spyOn(persistanceAdapter, "updateAlert");
  });

  afterEach(() => {
    spy.mockRestore();
    spyMail.mockRestore();
    spySms.mockRestore();
    spyPersistance.mockRestore();
    spyPersistanceUpdate.mockRestore();
    spyTimer.mockRestore();
  });

  it(`Given a Monitored Service in an Unhealthy State,
  the corresponding Alert is not Acknowledged
  and the last level has not been notified,
  when the Pager receives the Acknowledgement Timeout,
  then the Pager notifies all targets of the next level of the escalation policy
  and sets a 15-minutes acknowledgement delay.`, async () => {
    // mock persistance adapter!!!!!!!
    spyPersistance = jest.fn();
    spyPersistance = jest
      .spyOn(persistanceAdapter, "getAlert")
      .mockImplementation(async () => PagerlevelZeroUnhealthy);

    const result = await timerInUseCase.processTimerEvent(timerEvent);

    expect(result).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(timerEvent);
    expect(spyMail).toHaveBeenCalledTimes(2);
    expect(spyMail).toHaveBeenLastCalledWith({
      to: "bigboss@pepon.com",
      from: "system@system.com",
      message:
        "***Something really bad happened*** serviceID: service123 status: unhealthy"
    });
    expect(spySms).toHaveBeenCalledTimes(1);
    expect(spySms).toHaveBeenCalledWith({
      to: "+1212345890",
      from: "+34987654321",
      message:
        "***Something really bad happened*** serviceID: service123 status: unhealthy"
    });

    expect(spyPersistanceUpdate).toHaveBeenCalledTimes(1);
    expect(spyPersistanceUpdate).toHaveBeenCalledWith(
      "2cf959e7-928a-49a2-8c5e-76c400b9f34f",
      { alertLevel: 1 }
    );
  });

  it(`Given a Monitored Service in an Unhealthy State
  when the Pager receives the Acknowledgement
  and later receives the Acknowledgement Timeout,
  then the Pager doesn't notify any Target
  and doesn't set an acknowledgement delay.
  `, async () => {
    // mock persistance adapter!!!!!!!

    spyPersistance = jest.fn();
    spyPersistance = jest
      .spyOn(persistanceAdapter, "getAlert")
      .mockImplementation(async () => PagerAlertAcknoledged);

    const result = await timerInUseCase.processTimerEvent(timerEvent);

    expect(result).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(timerEvent);
    expect(spyMail).toHaveBeenCalledTimes(0);
    expect(spySms).toHaveBeenCalledTimes(0);
    expect(spyTimer).toHaveBeenCalledTimes(0);
    expect(spyPersistanceUpdate).toHaveBeenCalledTimes(0);
  });

  it(`Given a Monitored Service in an Unhealthy State,
  when the Pager receives a Healthy event related to this Monitored Service
  and later receives the Acknowledgement Timeout,
  then the Monitored Service becomes Healthy,
  the Pager doesn’t notify any Target
  and doesn’t set an acknowledgement delay
  `, async () => {
    spyPersistance = jest.fn();
    spyPersistance = jest
      .spyOn(persistanceAdapter, "getAlert")
      .mockImplementation(async () => PagerlevelOneHealthy);

    const result = await timerInUseCase.processTimerEvent(timerEvent);

    expect(result).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(timerEvent);
    expect(spyMail).toHaveBeenCalledTimes(0);
    expect(spySms).toHaveBeenCalledTimes(0);
    expect(spyTimer).toHaveBeenCalledTimes(0);
    expect(spyPersistanceUpdate).toHaveBeenCalledTimes(0);
  });

  it("should return false if there are no more targets or levels", async () => {
    spyPersistance = jest.fn();
    spyPersistance = jest
      .spyOn(persistanceAdapter, "getAlert")
      .mockImplementation(async () => NoMoreLevels);

    const result = await timerInUseCase.processTimerEvent(timerEvent);

    expect(result).toBeFalsy();
  });
});
