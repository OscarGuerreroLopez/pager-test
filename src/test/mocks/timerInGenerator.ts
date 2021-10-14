import { Timer, TimerTransResult } from "../../pager-service/entities/types";
import { TimerInPort } from "../../pager-service/entities/interfaces";

class TimerInAdapter implements TimerInPort {
  async getTimer(timer: Timer): Promise<TimerTransResult> {
    console.log("Fake implementation of a timer inbound adapter", timer);

    return true;
  }
}

export default TimerInAdapter;
