import { EscalationPolicy } from "../types";

export interface EscalationUseCase {
  getEscalationPolicy(serviceId: string): Promise<EscalationPolicy>;
}

export interface EscalationPort {
  getEscalation(serviceId: string): Promise<EscalationPolicy>;
}
