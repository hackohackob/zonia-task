import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TimeOfNextRaffleResponse } from './types/time.types';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http: HttpClient, @Inject('apiUrl') private apiUrl: string) { }

  getTimeOfNextRaffle() {
    return this.http.get<TimeOfNextRaffleResponse>(`${this.apiUrl}/time`);
  }
}
