import Mail from "./mailGenerator";
import { Mail as MailType } from "../entities/types";
import MailUseCase from "../use-cases/mail";

const mailAdapter = new Mail();

const mailUseCase = new MailUseCase(mailAdapter);

const email: MailType = {
  to: "user@user.com",
  from: "system@system.com",
  message: `"Something bad happened" serviceID: "123" status: unhealthy`
};

describe("Mail adapter", () => {
  it("should return true", async () => {
    const result = mailUseCase.sendEmailNotification(email);

    expect(result).toBeTruthy();
  });
});
