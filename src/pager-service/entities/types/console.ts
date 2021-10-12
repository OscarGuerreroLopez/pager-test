import { ServiceStatus } from "./alert";

export type ConsoleNotification = {
  serviceId: string;
  alertId: string;
  status: ServiceStatus;
};
