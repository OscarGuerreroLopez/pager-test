import { SmsPort } from "../entities/interfaces";
import { Sms, SmsTransResult } from "../entities/types";

class SmsAdapter implements SmsPort {
  async sendSms(sms: Sms): Promise<SmsTransResult> {
    console.log("Fake implementation of an Sms Adapter", sms);
    return true;
  }
}

export default SmsAdapter;
