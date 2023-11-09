import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TimeService } from './time.service';
import { map } from 'rxjs';

export const canActivateWinningUserGuard: CanActivateFn = (route, state) => {
  // if the user tries to open the winning-user URL and we still don't have the time of the next raffle, then we can't determine if the timer has expired
  // after TimeService has loaded the time of the next raffle, we can determine if the timer has expired
  const hasTimerExpired = inject(TimeService).hasTimerExpired;
  if (hasTimerExpired) {
    return true;
  } else {
    inject(Router).navigate(['/time-left']);
    return false;
  }
};

