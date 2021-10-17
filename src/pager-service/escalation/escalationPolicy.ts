import { EscalationUseCase, EscalationRepository } from "./entities/interfaces";
import { EscalationPolicy as EPResult } from "./entities/types";

class EscalationPolicy implements EscalationUseCase {
  protected repository: EscalationRepository;

  constructor(repository: EscalationRepository) {
    this.repository = repository;
  }

  // get the escalation policy from storage to be used
  async getEscalationPolicy(serviceId: string): Promise<EPResult> {
    return await this.repository.getPolicy(serviceId);
  }
}

export default EscalationPolicy;
