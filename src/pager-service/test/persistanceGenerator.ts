import { PersistanceRepository } from "../entities/interfaces";
import { ServiceStatus, Timer } from "../entities/types";

class PersistanceAdapter implements PersistanceRepository {
  constructor() {
    console.log("@@@ PersistanceAdapter constructor");
  }

  async storeAlert(pager: Timer): Promise<boolean> {
    console.log("@@@ storeAlert at PersistanceAdapter", pager);

    return true;
  }

  async resetAlert(alertId: string, status: ServiceStatus): Promise<boolean> {
    console.log("@@@ resetAlert at PersistanceAdapter", alertId, status);

    return true;
  }
}

export default PersistanceAdapter;
