import { EscalationPolicy as EPResult } from "../pager-service/escalation/entities/types";
import EscalationUseCase from "../pager-service/escalation/escalationPolicy";

const data = {
  id: "1234",
  serviceId: "service1",
  levels: [
    {
      target: { email: ["pepon@pepon.com"] }
    }
  ]
};

const repo = {
  getPolicy: (serviceId: string): Promise<EPResult> => {
    return new Promise((resolve) => {
      resolve({
        id: "1234",
        serviceId,
        levels: [
          {
            target: { email: ["pepon@pepon.com"] }
          }
        ]
      });
    });
  }
};

const escalationUseCase = new EscalationUseCase(repo);

describe("Escalation Policy UseCase", () => {
  it("should return the right data from repo", async () => {
    const result = await escalationUseCase.getEscalationPolicy("service1");

    expect(result).toStrictEqual(data);
  });
});
