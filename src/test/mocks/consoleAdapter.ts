import { HealthyNotification } from "../../pager-service/console/entities/types";
import ConsoleUseCase from "../../pager-service/console";
import { ConsolePort } from "../../pager-service/console/entities/interfaces";

class ConsoleAdapter extends ConsoleUseCase implements ConsolePort {
  async receiveNewHealthyNotification(
    notification: HealthyNotification
  ): Promise<boolean> {
    return await this.setHealthyAlertNotification(notification);
  }

  async receiveNewAcknowledgedNotification(alertId: string): Promise<boolean> {
    return this.setAcknowledgedNotification(alertId);
  }
}

export default ConsoleAdapter;
