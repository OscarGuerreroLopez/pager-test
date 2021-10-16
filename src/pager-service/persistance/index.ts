import { PagerEvent } from "./entities/types";
import {
  PersistanceUseCase,
  PersistanceRepository
} from "./entities/interfaces";
import { ServiceStatus } from "../alert/entities/types";

class Persistance implements PersistanceUseCase {
  protected persistanceRepository: PersistanceRepository;

  constructor(persistanceRepository: PersistanceRepository) {
    this.persistanceRepository = persistanceRepository;
  }

  async sendAlertNotification(pager: PagerEvent): Promise<boolean> {
    return await this.persistanceRepository.storeAlert(pager);
  }

  async getAlertNotification(alertId: string): Promise<PagerEvent> {
    return await this.persistanceRepository.getAlert(alertId);
  }

  async updateAlertNotification(
    alertId: string,
    alertLevel: number
  ): Promise<boolean> {
    return this.persistanceRepository.updateAlert(alertId, alertLevel);
  }

  async resetAlertNotification(
    alertId: string,
    status: ServiceStatus
  ): Promise<boolean> {
    return this.persistanceRepository.resetAlert(alertId, status);
  }

  async acknowledgedAlertNotification(alertId: string): Promise<boolean> {
    return this.persistanceRepository.acknowledgedAlert(alertId);
  }
}

export default Persistance;
