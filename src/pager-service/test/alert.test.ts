import Alertgenerator from "./alertGenerator";

import { Alert } from "../entities/types";

import { Identification } from "./idGenerator";
import Escalation from "./escalationGenerator";
import Mail from "./mailGenerator";
import Sms from "./smsGenerator";

const identification = new Identification();

const escalation = new Escalation();

const mail = new Mail();
const sms = new Sms();

const alertingAdapter = new Alertgenerator(
  identification,
  escalation,
  mail,
  sms
);

describe("Alert Use Case with adaptors", () => {
  let spy: jest.Mock<any, any> | jest.SpyInstance<never, never>;

  beforeAll(async () => {
    spy = jest.fn();
    spy = jest.spyOn(mail, "sendMail" as never);
  });

  afterEach(() => spy.mockRestore());
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

    expect(spy).toHaveBeenCalledTimes(1);
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
