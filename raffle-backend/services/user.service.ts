import { User, UserGender } from "../models/user";
import { NameService } from "./name.service";

export class UserService {
  namesService: NameService

  constructor() {
    this.namesService = new NameService();
  }

  getNewRandomUser(gender?: UserGender): User {
    gender = gender || this.getRandomGender();
    let names = this.namesService.getRandomName(gender);

    return {
      ...names,
      gender
    }
  }

  getRandomGender() {
    const randomGender = Math.floor(Math.random() * 2) + 1;
    return randomGender as UserGender;
  }
}

