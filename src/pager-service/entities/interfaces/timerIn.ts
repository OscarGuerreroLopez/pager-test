import { Timer as TimerType, TimerTransResult } from "../types";

export interface TimerInUseCase {
  getTimerEvent(timer: TimerType): Promise<TimerTransResult>;
}

export interface TimerInPort {
  getTimer(timer: TimerType): Promise<TimerTransResult>;
}
