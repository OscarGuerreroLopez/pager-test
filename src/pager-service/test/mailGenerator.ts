import { MailPort } from "../entities/interfaces";
import { Mail, MailTransResult } from "../entities/types";

class MailAdapter implements MailPort {
  async sendMail(mail: Mail): Promise<MailTransResult> {
    console.log("Fake implementation of an email adapter for testing", mail);

    return true;
  }
}

export default MailAdapter;
