import { Alert } from "./alert";
import { EscalationPolicy } from "./escalationPolicy";

export type Timer = {
  alert: Alert;
  ep: EscalationPolicy;
  alertLevel: number;
  date: Date;
};

export type TimerTransResult = boolean;
