import { Alert, ProcessedAlert } from "../types";

export interface AlertUseCase {
  newAlert(alert: Alert): Promise<ProcessedAlert>;
}

export interface AlertPort {
  receiveNewAlert(alert: Alert): Promise<ProcessedAlert>;
}
