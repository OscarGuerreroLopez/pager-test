import { ConsoleUseCase } from "../console/entities/interfaces";
import { HealthyNotification } from "../console/entities/types";
import { PersistanceRepository } from "../persistance/entities/interfaces";

class Console implements ConsoleUseCase {
  protected persistanceRepo: PersistanceRepository;

  constructor(persistanceRepo: PersistanceRepository) {
    this.persistanceRepo = persistanceRepo;
  }

  // this method gets executed if an engineer reports a healthy alert
  async setHealthyAlertNotification(
    notification: HealthyNotification
  ): Promise<boolean> {
    return await this.persistanceRepo.resetAlert(
      notification.alertId,
      notification.status
    );
  }

  // this gets executed if an engineer acknowledge an alert
  async setAcknowledgedNotification(alertId: string): Promise<boolean> {
    return await this.persistanceRepo.acknowledgedAlert(alertId);
  }
}

export default Console;
