import { Alert, ProcessedAlert } from "../alert/entities/types";
import AlertUseCase from "../alert";
import { AlertPort } from "../alert/entities/interfaces";

class AlertingAdapter extends AlertUseCase implements AlertPort {
  async receiveNewAlert(alert: Alert): Promise<ProcessedAlert> {
    const createdAlert = await this.newAlert(alert);

    return createdAlert;
  }
}

export default AlertingAdapter;
