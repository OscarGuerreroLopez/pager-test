export interface ID {
  makeId: () => string;
  isValidId: (uuid: string) => boolean;
}
