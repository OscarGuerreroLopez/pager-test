import { TimerPort } from "../../pager-service/timer/entities/interfaces";
import {
  TimerTransResult,
  TimerEvent
} from "../../pager-service/timer/entities/types";

class TimerAdapter implements TimerPort {
  async sendTimer(timer: TimerEvent): Promise<TimerTransResult> {
    console.log(
      "Fake implementation of the timer outbound adapter, sendTimer",
      timer
    );
    return true;
  }

  async resetTimer(timer: TimerEvent): Promise<TimerTransResult> {
    console.log(
      "Fake implementation of the timer outbound adapter, resetTimer",
      timer
    );
    return true;
  }
}

export default TimerAdapter;
