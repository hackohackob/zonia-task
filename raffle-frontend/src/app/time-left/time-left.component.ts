import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-left',
  templateUrl: './time-left.component.html',
  styleUrls: ['./time-left.component.scss']
})
export class TimeLeftComponent {
  $timeOfNextRaffleMessage: Observable<string|null>;
  timerExpired = false;

  interVal: any;
  timeRemaining: string|null = null;

  constructor(public timeService: TimeService, private router: Router) {
    this.$timeOfNextRaffleMessage = this.timeService.$timeRemaining.pipe(
      map((timeRemaining) => {
        if (!timeRemaining) {
          return null;
        }

        return `${this.prefixWithZero(timeRemaining.hours)}:${this.prefixWithZero(timeRemaining.minutes)}:${this.prefixWithZero(timeRemaining.seconds)}`;
      })
    );
  }

  goToWinningUser() {
    this.router.navigate(['/winning-user']);
  }

  prefixWithZero(number: number) {
    return number < 10 ? `0${number}` : `${number}`;
  } 
}
