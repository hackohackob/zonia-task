import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TimeOfNextRaffleResponse, TimeRemaining } from './types/time.types';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private interval: any;
  timeOfNextRaffle: Date|null = null;
  hasTimerExpired = false;
  $timeRemaining: BehaviorSubject<TimeRemaining|null> = new BehaviorSubject<TimeRemaining|null>(null);
  $timerExpired: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, @Inject('apiUrl') private apiUrl: string) {   
    firstValueFrom(this.http.get<TimeOfNextRaffleResponse>(`${this.apiUrl}/time`))
    // 
    // if you want to test uncomment next lines and comment previous line
    //
    // new Promise<TimeOfNextRaffleResponse>((resolve) => {
    //     resolve({
    //       timeOfNextRaffle: new Date(+new Date() + 6000),
    //       timeLeftUntilNextRaffleMs: 6000
    //     });
    // })
    .then((response) => {
      this.timeOfNextRaffle = new Date(response.timeOfNextRaffle);
      if (response.timeLeftUntilNextRaffleMs <= 0) {
        this.expireTimer();
      }

      this.updateTimeRemaining();
    });
  }

  updateTimeRemaining() {
    this.interval = setInterval(() => {
      let timeRemaining = this.getRemainingTime();

      if (timeRemaining) {
        if (timeRemaining <= 0) {
          timeRemaining = 0;
          this.expireTimer();
        }

        this.$timeRemaining.next(this.convertMillisecondsToTime(timeRemaining));
      }
    }, 1000);
  }

  expireTimer() {
    clearInterval(this.interval);
    this.hasTimerExpired = true;
    this.$timerExpired.next(true);
  }

  getTimeOfNextRaffle() {
    return this.timeOfNextRaffle;
  }

  private getRemainingTime() {
    if (!this.timeOfNextRaffle) {
      return null;
    }

    const timeDifference = this.timeOfNextRaffle.getTime() - new Date().getTime();
    return timeDifference;
  }

  convertMillisecondsToTime(milliseconds: number): TimeRemaining {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return {
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60
    };
  }


}
