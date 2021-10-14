import { MailPort } from "../../pager-service/mail/entities/interfaces";
import { Mail, MailTransResult } from "../../pager-service/mail/entities/types";

class MailAdapter implements MailPort {
  async sendMail(mail: Mail): Promise<MailTransResult> {
    console.log("Fake implementation of an email adapter for testing", mail);

    // in a normal microservice infra this will most likely send the email to a queue and then the consumer will
    // will take care of it. I am returning true as if the process was sucessful

    return true;
  }
}

export default MailAdapter;
