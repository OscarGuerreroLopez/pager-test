import { HealthyNotification } from "../types";

export interface ConsoleUseCase {
  setHealthyAlertNotification(
    notification: HealthyNotification
  ): Promise<boolean>;
  setAcknowledgedNotification(alertId: string): Promise<boolean>;
}

export interface ConsolePort {
  receiveNewHealthyNotification(
    notification: HealthyNotification
  ): Promise<boolean>;
  receiveNewAcknowledgedNotification(alertId: string): Promise<boolean>;
}
