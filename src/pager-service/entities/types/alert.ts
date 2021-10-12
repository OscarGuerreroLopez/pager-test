export type ServiceStatus = "healthy" | "unhealthy";

export type Alert = {
  id?: string;
  serviceId: string;
  message: string;
  status: ServiceStatus;
};

export type ProcessedAlert = { id: string; processed: boolean };
