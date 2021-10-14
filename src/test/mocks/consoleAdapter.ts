import { ConsoleNotification } from "../../pager-service/console/entities/types";
import ConsoleUseCase from "../../pager-service/console";
import { ConsolePort } from "../../pager-service/console/entities/interfaces";

class ConsoleAdapter extends ConsoleUseCase implements ConsolePort {
  async receiveNewNotification(
    notification: ConsoleNotification
  ): Promise<boolean> {
    const createdNotification = await this.setAlertNotification(notification);

    return createdNotification;
  }
}

export default ConsoleAdapter;
