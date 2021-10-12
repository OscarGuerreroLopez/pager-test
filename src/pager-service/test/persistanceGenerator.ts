import { PersistanceRepository } from "../entities/interfaces";
import { Timer } from "../entities/types";

class PersistanceAdapter implements PersistanceRepository {
  constructor() {
    console.log("@@@ PersistanceAdapter constructor");
  }

  async storeAlert(pager: Timer): Promise<boolean> {
    console.log("@@@ storeAlert at PersistanceAdapter", pager);

    return true;
  }
}

export default PersistanceAdapter;
