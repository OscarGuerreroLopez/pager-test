import { Timer } from "../entities/types";
import {
  PersistanceUseCase,
  PersistanceRepository
} from "../entities/interfaces";

class Persistance implements PersistanceUseCase {
  protected persistanceRepository: PersistanceRepository;

  constructor(persistanceRepository: PersistanceRepository) {
    this.persistanceRepository = persistanceRepository;
  }

  async sendAlertNotification(pager: Timer): Promise<boolean> {
    console.log("@@@ sendAlertNotification in Persitance Use Case");

    return await this.persistanceRepository.storeAlert(pager);
  }
}

export default Persistance;
