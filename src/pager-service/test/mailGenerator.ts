import { MailPort } from "../entities/interfaces";
import { Mail, MailTransResult } from "../entities/types";

class MailAdapter implements MailPort {
  constructor() {
    console.log("@@@ MailAdapter constructor");
  }

  async sendMail(mail: Mail): Promise<MailTransResult> {
    console.log(
      "@@@ MailGunEmailAdapter Sending email from mailGunEmailAdapter. this would be the mail gun implementation...",
      mail
    );
    return true;
  }
}

export default MailAdapter;
