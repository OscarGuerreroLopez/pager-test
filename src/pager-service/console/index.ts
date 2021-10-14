import { TimerPort } from "../entities/interfaces";
import { ConsoleUseCase } from "../console/entities/interfaces";
import { ConsoleNotification } from "../console/entities/types";
import { PersistanceRepository } from "../persistance/entities/interfaces";

class Console implements ConsoleUseCase {
  protected persistanceRepo: PersistanceRepository;
  protected timerAdapter: TimerPort;

  constructor(persistanceRepo: PersistanceRepository, timerAdapter: TimerPort) {
    this.persistanceRepo = persistanceRepo;
    this.timerAdapter = timerAdapter;
  }

  async setAlertNotification(
    notification: ConsoleNotification
  ): Promise<boolean> {
    const resetAlert = await this.persistanceRepo.resetAlert(
      notification.alertId,
      notification.status
    );

    const resetTimer = await this.timerAdapter.resetTimer(
      notification.alertId,
      notification.status
    );

    if (resetTimer && resetAlert) {
      return true;
    }

    return false;
  }
}

export default Console;
