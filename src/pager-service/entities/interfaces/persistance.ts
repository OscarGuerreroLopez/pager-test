import { Timer } from "../types";

export interface PersistanceRepository {
  storeAlert(pager: Timer): Promise<boolean>;
}

export interface PersistanceUseCase {
  sendAlertNotification(pager: Timer): Promise<boolean>;
}
