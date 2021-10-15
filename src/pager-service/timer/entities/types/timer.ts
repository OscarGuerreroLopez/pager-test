import { Alert } from "../../../alert/entities/types";
import { EscalationPolicy } from "../../../escalation/entities/types";

export type TimerIn = {
  alert: Alert;
  ep: EscalationPolicy;
  alertLevel: number;
  delay: number;
};

export type TimerEvent = {
  alertId: string;
  alertedLevel: number;
  time: Date;
  delay: number;
};

export type TimerTransResult = boolean;
