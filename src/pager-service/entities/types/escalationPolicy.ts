export type EscalationPolicy = {
  id: string;
  serviceId: string;
  levels: level[];
};

type level = { target: { email?: string[]; sms?: string[] } };
