// mock implementation of the persistance adapter interface
// in real life this will have the DB methods or at least the DB abstraction
// that interacts with the DB or whatever persistance system we use

// in this case, using the Escalation Port we can inject it into any services that need it
// those services will call the getEscalation method and this in exchange will
// provide the data
import { EscalationPolicy } from "../../pager-service/escalation/entities/types";
import { EscalationPort } from "../../pager-service/escalation/entities/interfaces";

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
