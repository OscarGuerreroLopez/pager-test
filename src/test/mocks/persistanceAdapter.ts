import { PersistanceRepository } from "../../pager-service/persistance/entities/interfaces";
import { TimerOut } from "../../pager-service/timer/entities/types";
import { ServiceStatus } from "../../pager-service/alert/entities/types";

class PersistanceAdapter implements PersistanceRepository {
  async storeAlert(pager: TimerOut): Promise<boolean> {
    console.log(
      "Fake implementation of a persistance adapter. This will store in the db",
      pager
    );

    return true;
  }

  async resetAlert(alertId: string, status: ServiceStatus): Promise<boolean> {
    console.log(
      "Fake implementation of a persistance adapter. this would reset an alert in case an engineer mark it as healthy ",
      alertId,
      status
    );

    return true;
  }

  async updateAlert(alertId: string, alertLevel: number): Promise<boolean> {
    console.log(
      "Fake implementation of a persistance adapter. This would update an alert in case the previous level did not acknowledge ",
      alertId,
      alertLevel
    );

    return true;
  }

  async getAlert(alertId: string): Promise<TimerOut> {
    console.log(
      "Fake implementation of a persistance adapter. This would getAlert unhealthy",
      alertId
    );
    return {
      alert: {
        serviceId: "service1",
        message: "***Something really bad happened***",
        status: "unhealthy",
        id: "2cf959e7-928a-49a2-8c5e-76c400b9f34f"
      },
      ep: {
        id: "1234",
        serviceId: "service1",
        levels: [
          {
            target: { email: ["pepon@pepon.com", "cto@pepon.com"] }
          },
          {
            target: {
              email: ["cto@pepon.com", "bigboss@pepon.com"],
              sms: ["+1212345890"]
            }
          }
        ]
      },
      alertLevel: 0,
      date: new Date(),
      delay: 900000
    };
  }
}

export default PersistanceAdapter;
