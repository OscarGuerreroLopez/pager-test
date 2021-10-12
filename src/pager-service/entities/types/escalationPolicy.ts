export type EscalationPolicy = {
  id: string;
  serviceId: string;
  levels: level[];
};

type level = { level: number; target: { email?: string[]; sms?: string[] } };
