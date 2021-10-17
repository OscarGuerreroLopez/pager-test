import { PersistanceRepository } from "../../pager-service/persistance/entities/interfaces";
import { PagerEvent } from "../../pager-service/persistance/entities/types";
import { ServiceStatus } from "../../pager-service/alert/entities/types";
import { PagerlevelZeroUnhealthy } from "./pagerGenerator";

class PersistanceAdapter implements PersistanceRepository {
  async storeAlert(pager: PagerEvent): Promise<boolean> {
    console.log(
      "Fake implementation of a persistance adapter. This will store in the db",
      pager
    );

    return true;
  }

  async updateAlert(alertId: string, alert: IObjectLiteral): Promise<boolean> {
    console.log(
      "Fake implementation of a persistance adapter. This would update an alert in case the previous level did not acknowledge ",
      alertId,
      alert
    );

    return true;
  }

  async getAlert(alertId: string): Promise<PagerEvent> {
    console.log(
      "Fake implementation of a persistance adapter. This would getAlert unhealthy",
      alertId
    );

    return PagerlevelZeroUnhealthy;
  }

  async getAlertByServiceAndStatus(
    serviceId: string,
    status: ServiceStatus
  ): Promise<PagerEvent[]> {
    console.log(
      "This is the getAlertByServiceAndStatus at the persistancedapter",
      serviceId,
      status
    );

    return [];
  }
}

export default PersistanceAdapter;
