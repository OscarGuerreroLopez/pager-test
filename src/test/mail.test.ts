import Mail from "./mocks/mailAdapter";
import { Mail as MailType } from "../pager-service/mail/entities/types";
import MailUseCase from "../pager-service/mail";

const mailAdapter = new Mail();

const mailUseCase = new MailUseCase(mailAdapter);

const email: MailType = {
  to: "user@user.com",
  from: "system@system.com",
  message: `"Something bad happened" serviceID: "123" status: unhealthy`
};

describe("Mail Use Case test", () => {
  it("should return true", async () => {
    const result = await mailUseCase.sendEmailNotification(email);

    expect(result).toBeTruthy();
  });

  it("should throw a missing message error ", async () => {
    const email: MailType = {
      to: "user@user.com",
      from: "system@system.com",
      message: ""
    };
    try {
      await mailUseCase.sendEmailNotification(email);
    } catch (error) {
      let message = "";

      if (error instanceof Error) {
        message = error.message;
      }

      expect(error).toBeInstanceOf(Error);
      expect(message).toStrictEqual("Missing message from email");
    }
  });
});
