import { ConsoleNotification } from "../entities/types";
import ConsoleUseCase from "../use-cases/console";
import { ConsolePort } from "../entities/interfaces";

class ConsoleAdapter extends ConsoleUseCase implements ConsolePort {
  async receiveNewNotification(
    notification: ConsoleNotification
  ): Promise<boolean> {
    console.log("@@@ receiveNewNotification in ConsoleAdapter ");

    const createdNotification = await this.setAlertNotification(notification);

    return createdNotification;
  }
}

export default ConsoleAdapter;
