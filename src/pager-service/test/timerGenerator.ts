import { TimerPort } from "../entities/interfaces";
import { Timer, TimerTransResult } from "../entities/types";

class TimerAdapter implements TimerPort {
  constructor() {
    console.log("@@@ TimerAdapter constructor");
  }

  async sendTimer(timer: Timer): Promise<TimerTransResult> {
    console.log("@@@ sendTimer in timerGenerator called", timer);
    return true;
  }
}

export default TimerAdapter;
