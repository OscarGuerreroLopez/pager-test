import { Alert } from "../../alert/entities/types";
import { EscalationPolicy } from "./escalationPolicy";

export type PagerEntity = {
  alert: Alert;
  ep: EscalationPolicy;
};
