import { PagerEvent } from "./entities/types";
import {
  PersistanceUseCase,
  PersistanceRepository
} from "./entities/interfaces";

class Persistance implements PersistanceUseCase {
  protected persistanceRepository: PersistanceRepository;

  constructor(persistanceRepository: PersistanceRepository) {
    this.persistanceRepository = persistanceRepository;
  }

  async sendAlertNotification(pager: PagerEvent): Promise<boolean> {
    return await this.persistanceRepository.storeAlert(pager);
  }

  async getAlertNotification(alertId: string): Promise<PagerEvent> {
    return await this.persistanceRepository.getAlert(alertId);
  }
}

export default Persistance;
