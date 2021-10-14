import { Mail, MailTransResult } from "../types";

export interface MailPort {
  sendMail(mail: Mail): Promise<MailTransResult>;
}

export interface MailUseCase {
  sendEmailNotification(event: Mail): Promise<MailTransResult>;
}
