import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion
} from "uuid";

export interface ID {
  makeId: () => string;
  isValidId: (uuid: string) => boolean;
}

export class Identification implements ID {
  makeId(): string {
    return uuidv4();
  }

  isValidId(uuid: string): boolean {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }
}
