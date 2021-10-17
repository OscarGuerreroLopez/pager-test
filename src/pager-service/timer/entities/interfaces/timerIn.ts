import { TimerEvent, TimerTransResult } from "../types";

export interface TimerInUseCase {
  processTimerEvent(timer: TimerEvent): Promise<TimerTransResult>;
}

export interface TimerInPort {
  processTimer(timer: TimerEvent): Promise<TimerTransResult>;
}
