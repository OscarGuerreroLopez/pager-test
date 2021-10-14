import { MailPort } from "../../pager-service/mail/entities/interfaces";
import { Mail, MailTransResult } from "../../pager-service/mail/entities/types";

class MailAdapter implements MailPort {
  async sendMail(mail: Mail): Promise<MailTransResult> {
    console.log("Fake implementation of an email adapter for testing", mail);

    return true;
  }
}

export default MailAdapter;
