import { PersistanceRepository } from "../entities/interfaces";
import { Timer } from "../entities/types";
import { ServiceStatus } from "../alert/entities/types";

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
