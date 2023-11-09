export enum UserGender {
  male = 1,
  female = 2
}

export interface User {
  firstName: string;
  lastName: string;
  gender?: UserGender;
}
