import { UserGender } from "../models/user";

export class NameService {
  private femaleFirstNames: string[] = ["Maria", "Elena", "Anna", "Sofia", "Anastasia", "Alexandra", "Victoria", "Kristina", "Gabriela", "Ivana", "Maya", "Tanya", "Kalina"];
  private femaleLastNames = ["Ivanova", "Petrova", "Georgieva", "Dimitrova", "Kirova", "Stoyanova", "Popova", "Todorova", "Vasileva"];

  private maleFirstNames = ["Georgi", "Ivan", "Dimitar", "Nikolay", "Stefan", "Petar", "Alexander", "Martin", "Hristo", "Daniel", "Kaloyan", "Boris", "Emil", "Vasil", "Radoslav", "Todor"];
  private maleLastNames = ["Ivanov", "Georgiev", "Dimitrov", "Kirov", "Stoyanov", "Popov", "Petrov"];

  public getRandomName(gender: UserGender) {
    const firstNamesArray = gender === UserGender.male ? this.maleFirstNames : this.femaleFirstNames;
    const lastNamesArray = gender === UserGender.male ? this.maleLastNames : this.femaleLastNames;

    const randomFirstName = firstNamesArray[Math.floor(Math.random() * firstNamesArray.length)];
    const randomLastName = lastNamesArray[Math.floor(Math.random() * lastNamesArray.length)];

    return {
      firstName: randomFirstName,
      lastName: randomLastName
    };
  }
}