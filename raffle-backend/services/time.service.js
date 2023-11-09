"use strict";
// create a node service that will return the time left until the next raffle
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeService = void 0;
class TimeService {
    constructor() {
        this.timeVariationMin = 30 * 60 * 1000; // 30 minutes
        this.timeVariationMax = 2 * 60 * 60 * 1000; // 2 hours
        this.timeOfNextRaffle = this.getRandomTime();
    }
    reset() {
        this.timeOfNextRaffle = this.getRandomTime();
    }
    getTimeOfNextRaffle() {
        return this.timeOfNextRaffle;
    }
    getTimeLeftUntilNextRaffle() {
        return +this.timeOfNextRaffle - +Date.now();
    }
    getRandomTime() {
        const timeVariation = this.timeVariationMax - this.timeVariationMin; // the difference between the max and min time (2hr - 30min -> 1.5hrs)
        const randomTimeVariation = Math.random() * timeVariation; // a random number between 0 and the time variation (random number between 0 and 1.5hrs)
        const randomTime = this.timeVariationMin + randomTimeVariation; // the random time between the min and max time (30min + random number between 0 and 1.5hrs) -> resulting in a random time between 30min and 2hrs 
        return new Date(Date.now() + randomTime); // the current time + the random time -> resulting in a random time between now+30mins and now+2hrs
    }
    _setTimeOfNextRaffle(time) {
        this.timeOfNextRaffle = time;
    }
}
exports.TimeService = TimeService;
