import { Alert } from "./entities/types";

export const VerifyAlert = (alert: Alert): Alert => {
  // Basic text to make sure that the alert comes with everything we need,
  // in a real prod app obviously this would be more elavorated
  // just to prove the point
  // we just through errors, the services that use this case should handle the exceptions
  // by using a typescript interface this should not happen but just in case we should
  // do a validation to make sure everything we need comes
  if (!alert.message) {
    throw new Error("Missing message from alert");
  }

  if (!alert.serviceId) {
    throw new Error("Missing serviceId from alert");
  }

  if (!alert.status) {
    throw new Error("Missing status from alert");
  }

  return alert;
};
