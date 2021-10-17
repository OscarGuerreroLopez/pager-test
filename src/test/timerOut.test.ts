import Timer from "./mocks/timerOutAdapter";
import { TimerEvent } from "../pager-service/timer/entities/types";
import TimerUseCase from "../pager-service/timer/timerOut";

const timerAdapter = new Timer();

const timerUseCase = new TimerUseCase(timerAdapter);

const timerEvent: TimerEvent = {
  alertId: "2cf959e7-928a-49a2-8c5e-76c400b9f34f",
  alertedLevel: 0,
  time: new Date("2021-10-16T16:23:05.276Z"),
  delay: 900000
};

describe("Timer Use Case test", () => {
  it("should return true if new timer event is created", async () => {
    const result = await timerUseCase.sendTimerNotification(timerEvent);

    expect(result).toBeTruthy();
  });
});
