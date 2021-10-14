import {
  Alert,
  ProcessedAlert
} from "../../pager-service/alert/entities/types";
import AlertUseCase from "../../pager-service/alert";
import { AlertPort } from "../../pager-service/alert/entities/interfaces";

class AlertingAdapter extends AlertUseCase implements AlertPort {
  async receiveNewAlert(alert: Alert): Promise<ProcessedAlert> {
    const createdAlert = await this.newAlert(alert);

    return createdAlert;
  }
}

export default AlertingAdapter;
