import { TimerPort } from "../entities/interfaces";
import { Timer, TimerTransResult, ServiceStatus } from "../entities/types";

class TimerAdapter implements TimerPort {
  constructor() {
    console.log("@@@ TimerAdapter constructor");
  }

  async sendTimer(timer: Timer): Promise<TimerTransResult> {
    console.log("@@@ sendTimer in timerGenerator called", timer);
    return true;
  }

  async resetTimer(
    alertId: string,
    status: ServiceStatus
  ): Promise<TimerTransResult> {
    console.log("@@@ resetTimer in timerGenerator called", alertId, status);
    return true;
  }
}

export default TimerAdapter;
