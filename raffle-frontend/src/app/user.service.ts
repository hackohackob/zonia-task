import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { WinningUserResponse } from './types/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, @Inject('apiUrl') private apiUrl: string) { }

  getWinningUser() {
    return this.httpClient.get<WinningUserResponse>(`${this.apiUrl}/user`);
  }
}
