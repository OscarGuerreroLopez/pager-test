import { TimerPort } from "../entities/interfaces";
import { Timer, TimerTransResult, ServiceStatus } from "../entities/types";

class TimerAdapter implements TimerPort {
  async sendTimer(timer: Timer): Promise<TimerTransResult> {
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
