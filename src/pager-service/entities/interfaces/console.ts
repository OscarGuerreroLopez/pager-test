import { ConsoleNotification } from "../types";

export interface ConsoleUseCase {
  setAlertNotification(notification: ConsoleNotification): Promise<boolean>;
}

export interface ConsolePort {
  receiveNewNotification(notification: ConsoleNotification): Promise<boolean>;
}
