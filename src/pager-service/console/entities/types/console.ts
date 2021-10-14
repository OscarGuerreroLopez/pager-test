import { ServiceStatus } from "../../../alert/entities/types";

export type ConsoleNotification = {
  serviceId: string;
  alertId: string;
  status: ServiceStatus;
};
