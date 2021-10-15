import { TimerIn as TimerType } from "../pager-service/timer/entities/types";
import TimerInUseCase from "../pager-service/timer/timerIn";
import Mail from "./mocks/mailAdapter";
import Sms from "./mocks/smsAdapter";
import Persistance from "./mocks/persistanceAdapter";

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
        target: {
          email: ["pepon@pepon.com", "cto@pepon.com"],
          sms: ["+1212345899"]
        }
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
  delay: 900000
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
  alertLevel: 2,
  delay: 900000
};

const timerEventWithHealthyStatus: TimerType = {
  alert: {
    serviceId: "service1",
    message: "***Something really bad happened***",
    status: "healthy",
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
  alertLevel: 2,
  delay: 900000
};

const mail = new Mail();
const sms = new Sms();
const persistanceAdapter = new Persistance();

const timerInUseCase = new TimerInUseCase(mail, sms, persistanceAdapter);

describe("TimerInUseCase", () => {
  let spy: jest.Mock<any, any> | jest.SpyInstance<never, never>;
  let spyMail: jest.Mock<any, any> | jest.SpyInstance<never, never>;
  let spySms: jest.Mock<any, any> | jest.SpyInstance<never, never>;

  beforeEach(async () => {
    spy = jest.fn();
    spy = jest.spyOn(timerInUseCase, "getTimerEvent" as never);
    spyMail = jest.fn();
    spyMail = jest.spyOn(mail, "sendMail" as never);
    spySms = jest.fn();
    spySms = jest.spyOn(sms, "sendSms" as never);
  });

  afterEach(() => {
    spy.mockRestore();
    spyMail.mockRestore();
    spySms.mockRestore();
  });

  it(`Given a Monitored Service in an Unhealthy State,
  the corresponding Alert is not Acknowledged
  and the last level has not been notified,
  when the Pager receives the Acknowledgement Timeout,
  then the Pager notifies all targets of the next level of the escalation policy
  and sets a 15-minutes acknowledgement delay.`, async () => {
    const result = await timerInUseCase.getTimerEvent(timerEvent);

    expect(result).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(timerEvent);
    expect(spyMail).toHaveBeenCalledTimes(2);
    expect(spySms).toHaveBeenCalledTimes(1);
  });

  it(`Given a Monitored Service in an Unhealthy State
  when the Pager receives the Acknowledgement
  and later receives the Acknowledgement Timeout,
  then the Pager doesn't notify any Target
  and doesn't set an acknowledgement delay.
  `, async () => {
    const result = await timerInUseCase.getTimerEvent(
      timerEventWithHealthyStatus
    );

    expect(result).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(timerEventWithHealthyStatus);
    expect(spyMail).toHaveBeenCalledTimes(0);
  });

  it("should return false cause there are no more levels", async () => {
    const result = await timerInUseCase.getTimerEvent(timerEventWithOneLevel);

    expect(result).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(timerEventWithOneLevel);
    expect(spyMail).toHaveBeenCalledTimes(0);
  });
});
