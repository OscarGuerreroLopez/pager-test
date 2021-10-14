import { TimerOut } from "../timer/entities/types";
import {
  PersistanceUseCase,
  PersistanceRepository
} from "./entities/interfaces";

class Persistance implements PersistanceUseCase {
  protected persistanceRepository: PersistanceRepository;

  constructor(persistanceRepository: PersistanceRepository) {
    this.persistanceRepository = persistanceRepository;
  }

  async sendAlertNotification(pager: TimerOut): Promise<boolean> {
    return await this.persistanceRepository.storeAlert(pager);
  }
}

export default Persistance;
