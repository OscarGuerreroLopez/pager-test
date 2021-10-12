import { Timer as TimerType } from "../entities/types";
import TimerInUseCase from "../use-cases/timerIn";
import Mail from "./mailGenerator";

const timerEvent: TimerType = {
  alert: {
    serviceId: "service1",
    message: "***Something really bad happened***",
    status: "unhealthy",
    id: "2cf959e7-928a-49a2-8c5e-76c400b9f34f"
  },
  ep: {
    id: "1234",
    serviceId: "service1",
    levels: [
      {
        target: { email: ["pepon@pepon.com", "cto@pepon.com"] }
      },
      {
        target: {
          email: ["cto@pepon.com", "bigboss@pepon.com"],
          sms: ["+1212345890"]
        }
      }
    ]
  },
  alertLevel: 1,
  date: new Date()
};

const timerEventWithOneLevel: TimerType = {
  alert: {
    serviceId: "service1",
    message: "***Something really bad happened***",
    status: "unhealthy",
    id: "2cf959e7-928a-49a2-8c5e-76c400b9f34f"
  },
  ep: {
    id: "1234",
    serviceId: "service1",
    levels: [
      {
        target: {
          email: ["poorsupportguy@pepon.com", "ctoofpoorguy@pepon.com"]
        }
      }
    ]
  },
  alertLevel: 1,
  date: new Date()
};

const mail = new Mail();

const timerInUseCase = new TimerInUseCase(mail);

describe("TimerInUseCase", () => {
  let spy: jest.Mock<any, any> | jest.SpyInstance<never, never>;
  let spyMail: jest.Mock<any, any> | jest.SpyInstance<never, never>;

  beforeEach(async () => {
    spy = jest.fn();
    spy = jest.spyOn(timerInUseCase, "getTimerEvent" as never);
    spyMail = jest.fn();
    spyMail = jest.spyOn(mail, "sendMail" as never);
  });

  afterEach(() => {
    spy.mockRestore();
    spyMail.mockRestore();
  });
  it("should return true", async () => {
    const result = await timerInUseCase.getTimerEvent(timerEvent);

    expect(result).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(timerEvent);
    expect(spyMail).toHaveBeenCalledTimes(2);
  });

  it("should return false", async () => {
    const result = await timerInUseCase.getTimerEvent(timerEventWithOneLevel);

    expect(result).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(timerEventWithOneLevel);
    expect(spyMail).toHaveBeenCalledTimes(0);
  });
});
