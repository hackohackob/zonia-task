"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameService = void 0;
const user_1 = require("../models/user");
class NameService {
    constructor() {
        this.femaleFirstNames = ["Maria", "Elena", "Anna", "Sofia", "Anastasia", "Alexandra", "Victoria", "Kristina", "Gabriela", "Ivana", "Maya", "Tanya", "Kalina"];
        this.femaleLastNames = ["Ivanova", "Petrova", "Georgieva", "Dimitrova", "Kirova", "Stoyanova", "Popova", "Todorova", "Vasileva"];
        this.maleFirstNames = ["Georgi", "Ivan", "Dimitar", "Nikolay", "Stefan", "Petar", "Alexander", "Martin", "Hristo", "Daniel", "Kaloyan", "Boris", "Emil", "Vasil", "Radoslav", "Todor"];
        this.maleLastNames = ["Ivanov", "Georgiev", "Dimitrov", "Kirov", "Stoyanov", "Popov", "Petrov"];
    }
    getRandomName(gender) {
        const firstNamesArray = gender === user_1.UserGender.male ? this.maleFirstNames : this.femaleFirstNames;
        const lastNamesArray = gender === user_1.UserGender.male ? this.maleLastNames : this.femaleLastNames;
        const randomFirstName = firstNamesArray[Math.floor(Math.random() * firstNamesArray.length)];
        const randomLastName = lastNamesArray[Math.floor(Math.random() * lastNamesArray.length)];
        return {
            firstName: randomFirstName,
            lastName: randomLastName
        };
    }
}
exports.NameService = NameService;
