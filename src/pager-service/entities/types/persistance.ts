import { Alert } from "../../alert/entities/types";
import { EscalationPolicy } from "../../escalation/entities/types";

export type PagerEntity = {
  alert: Alert;
  ep: EscalationPolicy;
};
