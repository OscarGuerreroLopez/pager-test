import Alertgenerator from "./mocks/alertAdapter";
import { Identification } from "./mocks/idGenerator";
import Escalation from "./mocks/escalationAdapter";
import Mail from "./mocks/mailAdapter";
import Sms from "./mocks/smsAdapter";
import Timer from "./mocks/timerOutAdapter";
import Persistance from "./mocks/persistanceAdapter";
import { Alert } from "../pager-service/alert/entities/types";

const identification = new Identification();

const escalation = new Escalation();

const mail = new Mail();
const sms = new Sms();
const timer = new Timer();
const persistance = new Persistance();

const alertingAdapter = new Alertgenerator(
  identification,
  escalation,
  mail,
  sms,
  timer,
  persistance
);

describe("Alert Use Case with adapters", () => {
  let spyMail: jest.Mock<any, any> | jest.SpyInstance<never, never>;
  let spyTimer: jest.Mock<any, any> | jest.SpyInstance<never, never>;
  let spyPersistance: jest.Mock<any, any> | jest.SpyInstance<never, never>;

  beforeAll(async () => {
    spyMail = jest.fn();
    spyMail = jest.spyOn(mail, "sendMail" as never);
    spyTimer = jest.fn();
    spyTimer = jest.spyOn(timer, "sendTimer" as never);
    spyPersistance = jest.fn();
    spyPersistance = jest.spyOn(persistance, "storeAlert" as never);
  });

  afterEach(() => {
    spyMail.mockRestore();
    spyTimer.mockRestore();
    spyPersistance.mockRestore();
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
    expect(spyPersistance).toHaveBeenCalledTimes(1);
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
