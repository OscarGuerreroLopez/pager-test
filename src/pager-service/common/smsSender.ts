import { Sms } from "../entities/types";

export const SmsSender = async (
  smsSender: (sms: Sms) => Promise<boolean>,
  phones: string[],
  message: string
): Promise<boolean> => {
  for (const phone of phones) {
    const smsMessage: Sms = {
      to: phone,
      from: "",
      message
    };
    await smsSender(smsMessage);
  }
  return true;
};
