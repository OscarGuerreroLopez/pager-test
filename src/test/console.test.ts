import ConsoleGenerator from "./mocks/consoleAdapter";
import { HealthyNotification } from "../pager-service/console/entities/types";
import Persistance from "./mocks/persistanceAdapter";

const persistance = new Persistance();

const consoleAdapter = new ConsoleGenerator(persistance);

describe("Console Use Case with adapters", () => {
  let spyPersistance: jest.Mock<any, any> | jest.SpyInstance<never, never>;

  beforeEach(async () => {
    spyPersistance = jest.fn();
    spyPersistance = jest.spyOn(persistance, "updateAlert" as never);
  });

  afterEach(() => {
    spyPersistance.mockRestore();
  });

  it("should return a valid output", async () => {
    const consoleNotification: HealthyNotification = {
      serviceId: "service1",
      alertId: "2cf959e7-928a-49a2-8c5e-76c400b9f34f",
      status: "healthy"
    };

    const result = await consoleAdapter.receiveNewHealthyNotification(
      consoleNotification
    );

    expect(result).toBeTruthy();
    expect(spyPersistance).toHaveBeenCalledTimes(1);
  });
  it("should return true if notification was acknowledge correctly", async () => {
    const result = await consoleAdapter.setAcknowledgedNotification(
      "2cf959e7-928a-49a2-8c5e-76c400b9f34f"
    );

    expect(result).toBeTruthy();
    expect(spyPersistance).toHaveBeenCalledTimes(1);
  });
});
