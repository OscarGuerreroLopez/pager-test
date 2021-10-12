import {
  TimerPort,
  PersistanceRepository,
  ConsoleUseCase
} from "../entities/interfaces";
import { ConsoleNotification } from "../entities/types";

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
    console.log("@@@ setAlertNotification at console usecase", notification);

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
