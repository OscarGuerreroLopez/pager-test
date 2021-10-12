import { EscalationPolicy } from "../entities/types";
import { EscalationPort } from "../entities/interfaces";

class EscalationPolicyAdapter implements EscalationPort {
  async getEscalation(serviceId: string): Promise<EscalationPolicy> {
    console.log(
      "@@@ getEscalationPolicy at EscalationPolicyAdapter",
      serviceId
    );

    return {
      id: "1234",
      serviceId,
      levels: [
        {
          target: { email: ["pepon@pepon.com"] }
        },
        {
          target: { email: ["pepon@pepon.com"], sms: ["+1212345890"] }
        }
      ]
    };
  }
}

export default EscalationPolicyAdapter;
