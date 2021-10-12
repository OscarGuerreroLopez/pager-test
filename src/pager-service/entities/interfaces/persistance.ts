import { Timer, ServiceStatus } from "../types";

export interface PersistanceRepository {
  storeAlert(pager: Timer): Promise<boolean>;
  resetAlert(alertId: string, status: ServiceStatus): Promise<boolean>;
}

export interface PersistanceUseCase {
  sendAlertNotification(pager: Timer): Promise<boolean>;
}
