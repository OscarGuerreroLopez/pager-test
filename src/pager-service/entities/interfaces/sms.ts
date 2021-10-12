import { Sms, SmsTransResult } from "../types";

export interface SmsPort {
  sendSms(sms: Sms): Promise<SmsTransResult>;
}

export interface SmsUseCase {
  sendSmsNotification(event: Sms): Promise<SmsTransResult>;
}
