import { PersistanceRepository } from "../../pager-service/persistance/entities/interfaces";
import { TimerOut } from "../../pager-service/timer/entities/types";
import { ServiceStatus } from "../../pager-service/alert/entities/types";

class PersistanceAdapter implements PersistanceRepository {
  async storeAlert(pager: TimerOut): Promise<boolean> {
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
}

export default PersistanceAdapter;
