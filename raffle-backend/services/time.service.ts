// create a node service that will return the time left until the next raffle

export class TimeService {
  private timeOfNextRaffle: Date;
  private timeVariationMin = 30 * 60 * 1000; // 30 minutes
  private timeVariationMax = 2 * 60 * 60 * 1000; // 2 hours

  constructor() {
    this.timeOfNextRaffle = this.getRandomTime();
  }

  public reset(): void {
    this.timeOfNextRaffle = this.getRandomTime();
  }

  public getTimeOfNextRaffle(): Date {
    return this.timeOfNextRaffle;
  }

  public getTimeLeftUntilNextRaffle(): number {
    return +this.timeOfNextRaffle - +Date.now();
  }

  private getRandomTime(): Date {
    const timeVariation = this.timeVariationMax - this.timeVariationMin; // the difference between the max and min time (2hr - 30min -> 1.5hrs)
    const randomTimeVariation = Math.random() * timeVariation; // a random number between 0 and the time variation (random number between 0 and 1.5hrs)
    const randomTime = this.timeVariationMin + randomTimeVariation; // the random time between the min and max time (30min + random number between 0 and 1.5hrs) -> resulting in a random time between 30min and 2hrs 
    return new Date(Date.now() + randomTime); // the current time + the random time -> resulting in a random time between now+30mins and now+2hrs
  }

  public _setTimeOfNextRaffle(time: Date) {
    this.timeOfNextRaffle = time;
  }
}

