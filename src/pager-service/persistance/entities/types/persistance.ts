import { Alert } from "../../../alert/entities/types";
import { EscalationPolicy } from "../../../escalation/entities/types";

export type PagerEvent = {
  alert: Alert;
  ep: EscalationPolicy;
  alertLevel: number;
  date: Date;
  delay: number;
};
