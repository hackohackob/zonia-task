import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TimeLeftComponent } from './time-left/time-left.component';
import { WinningUserComponent } from './winning-user/winning-user.component';
import { HttpClientModule } from '@angular/common/http';

//PrimeNG Modules
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';


import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule, Routes } from '@angular/router';
import { canActivateWinningUserGuard } from './can-activate-winning-user.guard';

const routes: Routes = [
  {
    path: 'time-left',
    component: TimeLeftComponent
  },
  {
    path: 'winning-user',
    component: WinningUserComponent,
    canActivate: [canActivateWinningUserGuard]
  },
  {
    path: '**',
    redirectTo: 'time-left'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TimeLeftComponent,
    WinningUserComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CardModule,
    ProgressSpinnerModule,
    ButtonModule,
    ChipModule
  ],
  providers: [
    {
      provide: 'apiUrl',
      useValue: 'http://localhost:3000/api'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
