import { Alert } from "../../../alert/entities/types";
import { EscalationPolicy } from "../../../escalation/entities/types";

export type Timer = {
  alert: Alert;
  ep: EscalationPolicy;
  alertLevel: number;
  date: Date;
};

export type TimerTransResult = boolean;
