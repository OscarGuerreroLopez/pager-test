import { TimerPort } from "../../pager-service/timer/entities/interfaces";
import {
  TimerOut,
  TimerTransResult
} from "../../pager-service/timer/entities/types";
import { ServiceStatus } from "../../pager-service/alert/entities/types";

class TimerAdapter implements TimerPort {
  async sendTimer(timer: TimerOut): Promise<TimerTransResult> {
    console.log("Fake implementation of the timer outbound adapter", timer);
    return true;
  }

  async resetTimer(
    alertId: string,
    status: ServiceStatus
  ): Promise<TimerTransResult> {
    console.log(
      "Fake implementation of the timer outbound adapter",
      alertId,
      status
    );
    return true;
  }
}

export default TimerAdapter;
