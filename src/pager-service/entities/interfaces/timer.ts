import { Timer, TimerTransResult } from "../types";

export interface TimerPort {
  sendTimer(timer: Timer): Promise<TimerTransResult>;
}

export interface TimerUseCase {
  sendTimerNotification(event: Timer): Promise<TimerTransResult>;
}
