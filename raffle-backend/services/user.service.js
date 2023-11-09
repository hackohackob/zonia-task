"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const name_service_1 = require("./name.service");
class UserService {
    constructor() {
        this.namesService = new name_service_1.NameService();
    }
    getNewRandomUser(gender) {
        gender = gender || this.getRandomGender();
        let names = this.namesService.getRandomName(gender);
        return Object.assign(Object.assign({}, names), { gender });
    }
    getRandomGender() {
        const randomGender = Math.floor(Math.random() * 2) + 1;
        return randomGender;
    }
}
exports.UserService = UserService;
