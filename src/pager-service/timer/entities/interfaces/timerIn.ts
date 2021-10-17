import { TimerEvent, TimerTransResult } from "../types";

export interface TimerInUseCase {
  getTimerEvent(timer: TimerEvent): Promise<TimerTransResult>;
}

export interface TimerInPort {
  getTimer(timer: TimerEvent): Promise<TimerTransResult>;
}
