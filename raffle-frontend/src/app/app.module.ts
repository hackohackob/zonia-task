import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TimeLeftComponent } from './time-left/time-left.component';
import { WinningUserComponent } from './winning-user/winning-user.component';
import { HttpClientModule } from '@angular/common/http';

//PrimeNG Modules
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';

import { TopbarComponent } from './topbar/topbar.component';

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
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    TooltipModule,
    MenuModule
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
