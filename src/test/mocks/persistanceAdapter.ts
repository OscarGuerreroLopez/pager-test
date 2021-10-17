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

  async resetAlert(alertId: string, status: ServiceStatus): Promise<boolean> {
    console.log(
      "Fake implementation of a persistance adapter. this would reset an alert in case an engineer mark it as healthy ",
      alertId,
      status
    );

    return true;
  }

  async updateAlert(alertId: string, alertLevel: number): Promise<boolean> {
    console.log(
      "Fake implementation of a persistance adapter. This would update an alert in case the previous level did not acknowledge ",
      alertId,
      alertLevel
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
  async acknowledgedAlert(alertId: string): Promise<boolean> {
    console.log(
      "This will set alert acknowledge to true and store in persistance",
      alertId
    );

    return true;
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
