import { Timer, TimerTransResult } from "../entities/types";
import { TimerInPort } from "../entities/interfaces";

class TimerInAdapter implements TimerInPort {
  async getTimer(timer: Timer): Promise<TimerTransResult> {
    console.log("@@@ getTimer in TimerInAdapter called", timer);

    return true;
  }
}

export default TimerInAdapter;
