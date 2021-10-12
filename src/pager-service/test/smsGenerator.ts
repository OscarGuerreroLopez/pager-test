import { SmsPort } from "../entities/interfaces";
import { Sms, SmsTransResult } from "../entities/types";

class SmsAdapter implements SmsPort {
  constructor() {
    console.log("@@@ SmsAdapter constructor");
  }
  async sendSms(sms: Sms): Promise<SmsTransResult> {
    console.log(
      "@@@ SmsAdapter Sending email from smsAdapter. this would be the sms implementation...",
      sms
    );
    return true;
  }
}

export default SmsAdapter;
