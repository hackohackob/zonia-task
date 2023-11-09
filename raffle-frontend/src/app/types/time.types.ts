export interface TimeOfNextRaffleResponse {
    timeOfNextRaffle: Date;
    timeLeftUntilNextRaffleMs: number;
}

export interface TimeRemaining {
    hours: number;
    minutes: number;
    seconds: number;
}