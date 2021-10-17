import { PagerEvent } from "../types";
import { ServiceStatus } from "../../../alert/entities/types";

export interface PersistanceRepository {
  storeAlert(pager: PagerEvent): Promise<boolean>;
  updateAlert(alertId: string, alert: IObjectLiteral): Promise<boolean>;
  getAlert(alertId: string): Promise<PagerEvent>;
  getAlertByServiceAndStatus(
    serviceId: string,
    status: ServiceStatus
  ): Promise<PagerEvent[]>;
}

export interface PersistanceUseCase {
  sendAlertNotification(pager: PagerEvent): Promise<boolean>;
  updateAlertNotification(
    alertId: string,
    alertLevel: number
  ): Promise<boolean>;
  getAlertNotification(alerdId: string): Promise<PagerEvent>;
  resetAlertNotification(
    alertId: string,
    status: ServiceStatus
  ): Promise<boolean>;
  acknowledgedAlertNotification(alertId: string): Promise<boolean>;
  getAlertByServiceAndStatusNotification(
    serviceId: string,
    status: ServiceStatus
  ): Promise<PagerEvent[]>;
}
