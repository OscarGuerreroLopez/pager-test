import { PagerEvent } from "../types";
import { ServiceStatus } from "../../../alert/entities/types";

export interface PersistanceRepository {
  storeAlert(pager: PagerEvent): Promise<boolean>;
  resetAlert(alertId: string, status: ServiceStatus): Promise<boolean>;
  updateAlert(alertId: string, alertLevel: number): Promise<boolean>;
  getAlert(alertId: string): Promise<PagerEvent>;
}

export interface PersistanceUseCase {
  sendAlertNotification(pager: PagerEvent): Promise<boolean>;
  getAlertNotification(alerdId: string): Promise<PagerEvent>;
}
