import { Sms as SmsType, SmsTransResult } from "../entities/types";
import { SmsUseCase, SmsPort } from "../entities/interfaces";

abstract class Sms implements SmsUseCase {
  protected smsService: SmsPort;

  constructor(smsService: SmsPort) {
    this.smsService = smsService;
  }

  private async verifySms(event: SmsType): Promise<SmsType> {
    if (!event.to) {
      throw new Error("Missing to from sms");
    }
    if (!event.from) {
      event.from = "+34111222333";
    }
    if (!event.message) {
      throw new Error("Missing message from sms");
    }

    return event;
  }

  async sendSmsNotification(event: SmsType): Promise<SmsTransResult> {
    const verifiedSms = await this.verifySms(event);

    return await this.smsService.sendSms(verifiedSms);
  }
}

export default Sms;
