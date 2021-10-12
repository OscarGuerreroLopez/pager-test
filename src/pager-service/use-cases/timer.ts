import { Timer as TimerType, TimerTransResult } from "../entities/types";
import { TimerPort, TimerUseCase } from "../entities/interfaces";

class Timer implements TimerUseCase {
  protected timerService: TimerPort;

  constructor(timerService: TimerPort) {
    console.log("@@@ constructor in timer use case");

    this.timerService = timerService;
  }

  async sendTimerNotification(event: TimerType): Promise<TimerTransResult> {
    console.log("@@@ sendTimerNotification in timer use case called", event);

    await this.timerService.sendTimer(event);

    return true;
  }
}

export default Timer;
