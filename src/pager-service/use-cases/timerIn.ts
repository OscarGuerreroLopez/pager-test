import {
  MailPort,
  TimerInUseCase,
  PersistanceRepository
} from "../entities/interfaces";
import { Mail, Timer as TimerType, TimerTransResult } from "../entities/types/";

class TimerIn implements TimerInUseCase {
  protected mailAdapter: MailPort;
  protected persistanceRepo: PersistanceRepository;

  constructor(mailAdapter: MailPort, persistanceRepo: PersistanceRepository) {
    console.log("@@@ constructor at TimerIn use case called");
    this.mailAdapter = mailAdapter;
    this.persistanceRepo = persistanceRepo;
  }

  async getTimerEvent(timer: TimerType): Promise<TimerTransResult> {
    console.log("@@@ getTimerEvent at TimerIn use case", timer);

    const isThereMoreLevels =
      timer.ep.levels[timer.alertLevel]?.target?.email || null;

    console.log("@@@ isThereMoreLevels", isThereMoreLevels);

    if (isThereMoreLevels) {
      for (const ep of isThereMoreLevels) {
        console.log("@@@ ep", ep);
        const email: Mail = {
          to: ep,
          from: "system@system.com",
          message: `${timer.alert.message} serviceID: ${timer.alert.serviceId} status: ${timer.alert.status}`
        };
        await this.mailAdapter.sendMail(email);
      }
      await this.persistanceRepo.storeAlert(timer);
      return true;
    }
    return false;
  }
}

export default TimerIn;
