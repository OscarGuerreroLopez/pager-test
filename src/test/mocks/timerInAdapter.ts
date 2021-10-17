import {
  TimerEvent,
  TimerTransResult
} from "../../pager-service/timer/entities/types";
import { TimerInPort } from "../../pager-service/timer/entities/interfaces";

class TimerInAdapter implements TimerInPort {
  async getTimer(timer: TimerEvent): Promise<TimerTransResult> {
    console.log("Fake implementation of a timer inbound adapter", timer);

    return true;
  }
}

export default TimerInAdapter;
