import { Alert } from "../../../alert/entities/types";
import { EscalationPolicy } from "../../../escalation/entities/types";

export type TimerIn = {
  alert: Alert;
  ep: EscalationPolicy;
  alertLevel: number;
  delay: number;
};

export type TimerOut = {
  alert: Alert;
  ep: EscalationPolicy;
  alertLevel: number;
  date: Date;
  delay: number;
};

export type TimerTransResult = boolean;
