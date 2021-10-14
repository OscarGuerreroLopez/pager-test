import {
  Alert,
  ProcessedAlert
} from "../../pager-service/alert/entities/types";
import AlertUseCase from "../../pager-service/alert";
import { AlertPort } from "../../pager-service/alert/entities/interfaces";

// Since this is an inbound fake adapter, we extend the use-case here so we call it directly and return whatever
// the use case sends, in real life this service could do some processing before calling the use-case
// maybe some logging as well, etc..... but for this test it just returns whatever comes from the use-case

class AlertingAdapter extends AlertUseCase implements AlertPort {
  async processNewAlert(alert: Alert): Promise<ProcessedAlert> {
    return await this.newAlert(alert);
  }
}

export default AlertingAdapter;
