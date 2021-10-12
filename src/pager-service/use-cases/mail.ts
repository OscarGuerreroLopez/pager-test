import { Mail as MailType, MailTransResult } from "../entities/types";
import { MailUseCase, MailPort } from "../entities/interfaces";

abstract class Mail implements MailUseCase {
  protected mailService: MailPort;

  constructor(mailService: MailPort) {
    this.mailService = mailService;
  }

  private async verifiedEmail(event: MailType): Promise<MailType> {
    console.log(
      "@@@ EmailNotificationuseCase verifying the email at the use case"
    );

    if (!event.to) {
      throw new Error("Missing to from email");
    }
    if (!event.from) {
      event.from = "oscar@oscar.com";
    }
    if (!event.message) {
      throw new Error("Missing message from email");
    }

    return event;
  }

  async sendEmailNotification(event: MailType): Promise<MailTransResult> {
    const verifiedEmail = await this.verifiedEmail(event);
    return await this.mailService.sendMail(verifiedEmail);
  }
}

export default Mail;