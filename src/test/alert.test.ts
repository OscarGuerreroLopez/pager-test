import AlertAdapter from "./mocks/alertAdapter";
import { Identification } from "./mocks/idGenerator";
import Escalation from "./mocks/escalationAdapter";
import Mail from "./mocks/mailAdapter";
import Sms from "./mocks/smsAdapter";
import Timer from "./mocks/timerOutAdapter";
import Persistance from "./mocks/persistanceAdapter";
import { Alert } from "../pager-service/alert/entities/types";
import { PagerlevelZeroUnhealthy } from "./mocks/pagerGenerator";

const identification = new Identification();

const escalation = new Escalation();

const mail = new Mail();
const sms = new Sms();
const timer = new Timer();
const persistance = new Persistance();

const alertingAdapter = new AlertAdapter(
  identification,
  escalation,
  mail,
  sms,
  timer,
  persistance
);
jest.useFakeTimers("modern").setSystemTime(new Date("2020-01-01").getTime());
describe("Alert Use Case with adapters", () => {
  let spyMail: jest.Mock<any, any> | jest.SpyInstance<any, any>;
  let spyTimer: jest.Mock<any, any> | jest.SpyInstance<any, any>;
  let spyPersistance: jest.Mock<any, any> | jest.SpyInstance<any, any>;
  let spyPersistanceGetAlertByServiceAndStatus:
    | jest.Mock<any, any>
    | jest.SpyInstance<any, any>;

  beforeAll(async () => {
    spyMail = jest.fn();
    spyMail = jest.spyOn(mail, "sendMail");
    spyTimer = jest.fn();
    spyTimer = jest.spyOn(timer, "sendTimer");
    spyPersistance = jest.fn();
    spyPersistance = jest.spyOn(persistance, "storeAlert");
    spyPersistanceGetAlertByServiceAndStatus = jest.fn();
    spyPersistanceGetAlertByServiceAndStatus = jest.spyOn(
      persistance,
      "getAlertByServiceAndStatus"
    );
  });

  afterEach(() => {
    spyMail.mockRestore();
    spyTimer.mockRestore();
    spyPersistance.mockRestore();
    spyPersistanceGetAlertByServiceAndStatus.mockRestore();
  });
  it(`Given a Monitored Service in a Healthy State,
  when the Pager receives an Alert related to this Monitored Service,
  then the Monitored Service becomes Unhealthy, the Pager notifies all targets of the first level of the escalation policy,
  and sets a 15-minutes acknowledgement delay`, async () => {
    const alert: Alert = {
      serviceId: "service1",
      message: "Something really bad happened",
      status: "unhealthy"
    };
    const result = await alertingAdapter.processNewAlert(alert);

    expect(result).toStrictEqual({
      id: "2cf959e7-928a-49a2-8c5e-76c400b9f34f",
      processed: true
    });

    expect(spyMail).toHaveBeenCalledTimes(2);
    expect(spyTimer).toHaveBeenCalledTimes(1);
    expect(spyTimer).toHaveBeenCalledWith({
      alertId: "2cf959e7-928a-49a2-8c5e-76c400b9f34f",
      alertedLevel: 0,
      time: new Date(),
      delay: 900000
    });
    expect(spyPersistance).toHaveBeenCalledTimes(1);
  });

  it(`Given a Monitored Service in an Unhealthy State,
  when the Pager receives an Alert related to this Monitored Service,
  then the Pager doesn’t notify any Target
  and doesn’t set an acknowledgement delay`, async () => {
    spyPersistanceGetAlertByServiceAndStatus = jest.fn();
    spyPersistanceGetAlertByServiceAndStatus = jest
      .spyOn(persistance, "getAlertByServiceAndStatus")
      .mockImplementation(async () => [PagerlevelZeroUnhealthy]);

    const alert: Alert = {
      serviceId: "service1",
      message: "Something really bad happened",
      status: "unhealthy"
    };
    const result = await alertingAdapter.processNewAlert(alert);

    expect(result).toStrictEqual({
      id: "2cf959e7-928a-49a2-8c5e-76c400b9f34f",
      processed: false,
      reason: "This service is already flagged as unhealthy"
    });

    expect(spyMail).toHaveBeenCalledTimes(0);
    expect(spyTimer).toHaveBeenCalledTimes(0);
  });

  it("should throw a missing message error ", async () => {
    const alert: Alert = {
      serviceId: "service1",
      message: "",
      status: "unhealthy"
    };
    try {
      await alertingAdapter.processNewAlert(alert);
    } catch (error) {
      let message = "";

      if (error instanceof Error) {
        message = error.message;
      }

      expect(error).toBeInstanceOf(Error);
      expect(message).toStrictEqual("Missing message from alert");
    }
  });

  it("should throw a missing service error ", async () => {
    const alert: Alert = {
      serviceId: "",
      message: "Something really bad happened",
      status: "unhealthy"
    };
    try {
      await alertingAdapter.processNewAlert(alert);
    } catch (error) {
      let message = "";

      if (error instanceof Error) {
        message = error.message;
      }

      expect(error).toBeInstanceOf(Error);
      expect(message).toStrictEqual("Missing serviceId from alert");
    }
  });
});
