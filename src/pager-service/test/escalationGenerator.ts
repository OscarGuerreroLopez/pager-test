import { EscalationPolicy } from "../entities/types";
import { EscalationPort } from "../entities/interfaces";

class EscalationPolicyAdapter implements EscalationPort {
  async getEscalation(serviceId: string): Promise<EscalationPolicy> {
    return {
      id: "1234",
      serviceId,
      levels: [
        {
          target: {
            email: ["pepon@pepon.com", "cto@pepon.com"],
            sms: ["+1212345890"]
          }
        },
        {
          target: {
            email: ["cto@pepon.com", "bigboss@pepon.com"],
            sms: ["+1212345890"]
          }
        }
      ]
    };
  }
}

export default EscalationPolicyAdapter;
