import Alertgenerator from "./mocks/alertGenerator";

import { Alert } from "../pager-service/alert/entities/types";

import { Identification } from "./mocks/idGenerator";
import Escalation from "./mocks/escalationGenerator";
import Mail from "./mocks/mailGenerator";
import Sms from "./mocks/smsGenerator";
import Timer from "./mocks/timerGenerator";
import Persistance from "./mocks/persistanceGenerator";

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

describe("Alert Use Case with adaptors", () => {
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
  it("should return a valid output", async () => {
    const alert: Alert = {
      serviceId: "service1",
      message: "Something really bad happened",
      status: "unhealthy"
    };
    const result = await alertingAdapter.receiveNewAlert(alert);

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
      await alertingAdapter.receiveNewAlert(alert);
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
      await alertingAdapter.receiveNewAlert(alert);
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