import Timer from "./mocks/timerGenerator";
import { Timer as TimerType } from "../pager-service/timer/entities/types";
import TimerUseCase from "../pager-service/timer/timerOut";

const timerAdapter = new Timer();

const timerUseCase = new TimerUseCase(timerAdapter);

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
  alertLevel: 0,
  date: new Date()
};

describe("Timer Use Case test", () => {
  it("should return true", async () => {
    const result = await timerUseCase.sendTimerNotification(timerEvent);

    expect(result).toBeTruthy();
  });
});
