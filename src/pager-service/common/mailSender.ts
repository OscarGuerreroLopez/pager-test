import { Mail } from "../entities/types";

export const MailSender = async (
  mailSender: (mail: Mail) => Promise<boolean>,
  emails: string[],
  message: string
): Promise<boolean> => {
  for (const mail of emails) {
    const email: Mail = {
      to: mail,
      from: "system@system.com",
      message
    };
    await mailSender(email);
  }
  return true;
};
