import { TimerOut } from "../../../timer/entities/types";
import { ServiceStatus } from "../../../alert/entities/types";

export interface PersistanceRepository {
  storeAlert(pager: TimerOut): Promise<boolean>;
  resetAlert(alertId: string, status: ServiceStatus): Promise<boolean>;
  updateAlert(alertId: string, alertLevel: number): Promise<boolean>;
  getAlert(alertId: string): Promise<TimerOut>;
}

export interface PersistanceUseCase {
  sendAlertNotification(pager: TimerOut): Promise<boolean>;
  getAlertNotification(alerdId: string): Promise<TimerOut>;
}
