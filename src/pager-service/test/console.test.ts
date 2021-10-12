import ConsoleGenerator from "./consoleGenerator";
import { ConsoleNotification } from "../entities/types";
import Timer from "./timerGenerator";
import Persistance from "./persistanceGenerator";

const timer = new Timer();
const persistance = new Persistance();

const consoleAdapter = new ConsoleGenerator(persistance, timer);

describe("Console Use Case with adapters", () => {
  let spyTimer: jest.Mock<any, any> | jest.SpyInstance<never, never>;
  let spyPersistance: jest.Mock<any, any> | jest.SpyInstance<never, never>;

  beforeAll(async () => {
    spyTimer = jest.fn();
    spyTimer = jest.spyOn(timer, "resetTimer" as never);
    spyPersistance = jest.fn();
    spyPersistance = jest.spyOn(persistance, "resetAlert" as never);
  });

  afterEach(() => {
    spyTimer.mockRestore();
    spyPersistance.mockRestore();
  });

  it("should return a valid output", async () => {
    const consoleNotification: ConsoleNotification = {
      serviceId: "service1",
      alertId: "2cf959e7-928a-49a2-8c5e-76c400b9f34f",
      status: "healthy"
    };

    const result = await consoleAdapter.receiveNewNotification(
      consoleNotification
    );

    expect(result).toBeTruthy();
    expect(spyTimer).toHaveBeenCalledTimes(1);
    expect(spyPersistance).toHaveBeenCalledTimes(1);
  });
});
