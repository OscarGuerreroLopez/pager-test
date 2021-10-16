import { ServiceStatus } from "../../../alert/entities/types";

export type HealthyNotification = {
  serviceId: string;
  alertId: string;
  status: ServiceStatus;
};

export type AcknowledgedNotification = {
  alertId: string;
};
