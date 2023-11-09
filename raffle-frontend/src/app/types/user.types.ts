export interface User {
  firstName: string;
  lastName: string;
  gender: UserGender;
}

export enum UserGender {
  male = 1,
  female = 2,
}

export interface WinningUserResponse {
  user: User|null;
  timeLeftUntilNextRaffleMs: number;
}