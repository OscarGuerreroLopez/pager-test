import { SmsPort } from "../../pager-service/sms/entities/interfaces";
import { Sms, SmsTransResult } from "../../pager-service/sms/entities/types";

class SmsAdapter implements SmsPort {
  async sendSms(sms: Sms): Promise<SmsTransResult> {
    console.log("Fake implementation of an Sms Adapter", sms);

    // in a normal microservice infra this will most likely send the message to a queue and then the consumer will
    // will take care of it. I am returning true as if the process was sucessful
    return true;
  }
}

export default SmsAdapter;
