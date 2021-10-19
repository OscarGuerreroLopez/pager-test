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
