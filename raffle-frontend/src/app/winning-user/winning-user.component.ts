import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User, WinningUserResponse } from '../types/user.types';

@Component({
  selector: 'app-winning-user',
  templateUrl: './winning-user.component.html',
  styleUrls: ['./winning-user.component.scss']
})
export class WinningUserComponent {
  winningUser: User|null = null;

  constructor(private userService: UserService) { }

  getWinningUser() {
    this.userService.getWinningUser()
      .subscribe((response: WinningUserResponse) => {
        if (response.user) {
          this.winningUser = response.user;
        }
      });
  }

  get winningUserFullName() {
    if (!this.winningUser) {
      return undefined;
    }

    return `Mr${this.winningUser.gender === 2 ? 's': ''}. ${this.winningUser.firstName} ${this.winningUser.lastName}`
  }
}
