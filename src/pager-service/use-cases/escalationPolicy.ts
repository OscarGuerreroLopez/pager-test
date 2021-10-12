import {
  EscalationUseCase,
  EscalationRepository
} from "../entities/interfaces";
import { EscalationPolicy as EPResult } from "../entities/types";

class EscalationPolicy implements EscalationUseCase {
  protected repository: EscalationRepository;

  constructor(repository: EscalationRepository) {
    console.log("@@@ constructor in Escalationpolicy UseCase");
    this.repository = repository;
  }

  async getEscalationPolicy(serviceId: string): Promise<EPResult> {
    console.log("@@@@ getEscalationPolicy in Escalation policy UseCase");

    return await this.repository.getPolicy(serviceId);
  }
}

export default EscalationPolicy;
