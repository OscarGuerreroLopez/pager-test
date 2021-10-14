import { Timer as TimerType } from "../pager-service/entities/types";
import TimerInUseCase from "../pager-service/use-cases/timerIn";
import Mail from "./mocks/mailGenerator";
import Sms from "./mocks/smsGenerator";
import Persistance from "./mocks/persistanceGenerator";

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
const sms = new Sms();
const persistanceAdapter = new Persistance();

const timerInUseCase = new TimerInUseCase(mail, sms, persistanceAdapter);

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