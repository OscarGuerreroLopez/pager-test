import { PersistanceRepository } from "../../pager-service/entities/interfaces";
import { Timer } from "../../pager-service/entities/types";
import { ServiceStatus } from "../../pager-service/alert/entities/types";

class PersistanceAdapter implements PersistanceRepository {
  async storeAlert(pager: Timer): Promise<boolean> {
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
}

export default PersistanceAdapter;
