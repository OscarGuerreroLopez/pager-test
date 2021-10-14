import { Timer, TimerTransResult } from "../types";
import { ServiceStatus } from "../../alert/entities/types";

export interface TimerPort {
  sendTimer(timer: Timer): Promise<TimerTransResult>;
  resetTimer(alertId: string, status: ServiceStatus): Promise<boolean>;
}

export interface TimerUseCase {
  sendTimerNotification(event: Timer): Promise<TimerTransResult>;
}
