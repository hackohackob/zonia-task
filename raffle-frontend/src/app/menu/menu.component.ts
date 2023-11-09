import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: any[] = [];

  constructor(private timeService: TimeService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Time Left',
        icon: 'pi pi-fw pi-clock',
        routerLink: ['/time-left']
      },
      {
        label: 'Winning User',
        routerLink: ['/winning-user'],
        icon: 'pi pi-fw pi-user',
        isDisabled: true
      }
    ];

    this.timeService.$timerExpired.subscribe((timerExpired) => {
      if (timerExpired) {
        this.items[1].isDisabled = false;
      }
    });
  }
}
