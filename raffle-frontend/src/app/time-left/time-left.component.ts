import { Component } from '@angular/core';
import { TimeService } from '../time.service';
import { firstValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-time-left',
  templateUrl: './time-left.component.html',
  styleUrls: ['./time-left.component.scss']
})
export class TimeLeftComponent {
  timeOfNextRaffle: Promise<Date>;

  constructor(private timeService: TimeService) {
    this.timeOfNextRaffle = firstValueFrom(this.timeService.getTimeOfNextRaffle().pipe(map((response) => new Date(response.timeOfNextRaffle))));
    console.log(this)
  }
}
