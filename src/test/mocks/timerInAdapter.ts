import {
  TimerEvent,
  TimerTransResult
} from "../../pager-service/timer/entities/types";
import { TimerInPort } from "../../pager-service/timer/entities/interfaces";
import TimerInUseCase from "../../pager-service/timer/timerIn";

class TimerInAdapter extends TimerInUseCase implements TimerInPort {
  async processTimer(timer: TimerEvent): Promise<TimerTransResult> {
    console.log("Fake implementation of a timer inbound adapter", timer);
    return await this.processTimerEvent(timer);
  }
}

export default TimerInAdapter;
