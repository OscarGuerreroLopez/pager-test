import { TimerOut, TimerTransResult } from "../types";
import { ServiceStatus } from "../../../alert/entities/types";

export interface TimerPort {
  sendTimer(timer: TimerOut): Promise<TimerTransResult>;
  resetTimer(alertId: string, status: ServiceStatus): Promise<boolean>;
}

export interface TimerUseCase {
  sendTimerNotification(event: TimerOut): Promise<TimerTransResult>;
}
