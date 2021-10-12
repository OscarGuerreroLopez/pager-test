import { Alert } from "./alert";
import { EscalationPolicy } from "./escalationPolicy";

export type PagerEntity = {
  alert: Alert;
  ep: EscalationPolicy;
};
