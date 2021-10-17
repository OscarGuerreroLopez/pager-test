import { TimerTransResult, TimerEvent } from "./entities/types";
import { TimerPort, TimerUseCase } from "./entities/interfaces";

class TimerOut implements TimerUseCase {
  protected timerService: TimerPort;

  constructor(timerService: TimerPort) {
    this.timerService = timerService;
  }

  // we send a new timer event to the timer service
  // whatever that timer service handles the delay is not
  // the use-case business
  async sendTimerNotification(event: TimerEvent): Promise<TimerTransResult> {
    await this.timerService.sendTimer(event);

    return true;
  }
}

export default TimerOut;
