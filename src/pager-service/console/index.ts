import { ConsoleUseCase } from "../console/entities/interfaces";
import { HealthyNotification } from "../console/entities/types";
import { PersistanceRepository } from "../persistance/entities/interfaces";

class Console implements ConsoleUseCase {
  protected persistanceRepo: PersistanceRepository;

  constructor(persistanceRepo: PersistanceRepository) {
    this.persistanceRepo = persistanceRepo;
  }

  async setHealthyAlertNotification(
    notification: HealthyNotification
  ): Promise<boolean> {
    return await this.persistanceRepo.resetAlert(
      notification.alertId,
      notification.status
    );
  }

  async setAcknowledgedNotification(alertId: string): Promise<boolean> {
    return await this.persistanceRepo.acknowledgedAlert(alertId);
  }
}

export default Console;
