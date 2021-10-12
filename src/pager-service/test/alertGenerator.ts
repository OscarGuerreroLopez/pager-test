import { Alert, ProcessedAlert } from "../entities/types";
import AlertUseCase from "../use-cases/alert";
import { AlertPort } from "../entities/interfaces";

class AlertingAdapter extends AlertUseCase implements AlertPort {
  async receiveNewAlert(alert: Alert): Promise<ProcessedAlert> {
    console.log("@@@ receiveNewAlert in  AlertingAdapter");

    const createdAlert = await this.newAlert(alert);

    return createdAlert;
  }
}

export default AlertingAdapter;
