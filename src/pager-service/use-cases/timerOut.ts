import { Timer as TimerType, TimerTransResult } from "../entities/types";
import { TimerPort, TimerUseCase } from "../entities/interfaces";

class Timer implements TimerUseCase {
  protected timerService: TimerPort;

  constructor(timerService: TimerPort) {
    this.timerService = timerService;
  }

  async sendTimerNotification(event: TimerType): Promise<TimerTransResult> {
    await this.timerService.sendTimer(event);

    return true;
  }
}

export default Timer;
