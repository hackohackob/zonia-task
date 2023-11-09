"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const time_service_1 = require("./services/time.service");
const user_service_1 = require("./services/user.service");
dotenv_1.default.config();
class RaffleSerer {
    constructor() {
        this.generatedWinninUser = null;
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        this.isDev = process.env.DEV === 'true';
        this.timeService = new time_service_1.TimeService();
        this.userService = new user_service_1.UserService();
        this.setDevMode(); // only for development purposes
        this.addMiddlewares();
        this.addRoutes();
        this.start();
    }
    setDevMode() {
        this.isDev = true;
    }
    addMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static('public'));
    }
    addRoutes() {
        this.app.get('/api/user', (req, res) => {
            const getTimeLeftUntilNextRaffle = this.timeService.getTimeLeftUntilNextRaffle();
            if (getTimeLeftUntilNextRaffle > 0) { // if the time left until the next raffle is positive, return null as the user and the time left until the next raffle
                res.json({
                    user: null,
                    timeLeftUntilNextRaffleMs: getTimeLeftUntilNextRaffle
                });
            }
            else {
                this.generatedWinninUser = this.generatedWinninUser || this.userService.getNewRandomUser(); // on the first request after the raffle, generate a new user and then return the same user
                res.json({
                    user: this.generatedWinninUser,
                });
            }
        });
        this.app.get('/api/time', (req, res) => {
            res.json({
                timeOfNextRaffle: this.timeService.getTimeOfNextRaffle(),
                timeLeftUntilNextRaffleMs: this.timeService.getTimeLeftUntilNextRaffle()
            });
        });
        this.app.post('/api/reset', (req, res) => {
            this.generatedWinninUser = null;
            this.timeService.reset();
            res.json({
                message: "Reset successful",
                timeOfNextRaffle: this.timeService.getTimeOfNextRaffle(),
                timeLeftUntilNextRaffleMs: this.timeService.getTimeLeftUntilNextRaffle()
            });
        });
        if (this.isDev) {
            // this is a dev endpoint that will expire the time until the next raffle
            // should be used only for testing purposes
            this.app.post('/api/dev/expire-time', (req, res) => {
                this.timeService._setTimeOfNextRaffle(new Date());
                res.json({
                    message: "Time expired"
                });
            });
        }
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}
const raffleServer = new RaffleSerer();
