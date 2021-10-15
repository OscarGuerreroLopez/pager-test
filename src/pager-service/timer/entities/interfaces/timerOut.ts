import { TimerTransResult, TimerEvent } from "../types";

export interface TimerPort {
  sendTimer(event: TimerEvent): Promise<TimerTransResult>;
  resetTimer(event: TimerEvent): Promise<TimerTransResult>;
}

export interface TimerUseCase {
  sendTimerNotification(event: TimerEvent): Promise<TimerTransResult>;
}
