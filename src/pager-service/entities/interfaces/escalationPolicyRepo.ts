import { EscalationPolicy } from "../types";

export interface EscalationRepository {
  getPolicy(serviceId: string): Promise<EscalationPolicy>;
}
