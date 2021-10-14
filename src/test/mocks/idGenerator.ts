import { ID } from "../../pager-service/entities/interfaces";

export class Identification implements ID {
  makeId(): string {
    return "2cf959e7-928a-49a2-8c5e-76c400b9f34f";
  }

  isValidId(): boolean {
    return true;
  }
}
