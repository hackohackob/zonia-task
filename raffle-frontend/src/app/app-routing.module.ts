import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeLeftComponent } from './time-left/time-left.component';
import { WinningUserComponent } from './winning-user/winning-user.component';

const routes: Routes = [
  {
    path: 'time-left',
    component: TimeLeftComponent
  },
  {
    path: 'winning-user',
    component: WinningUserComponent
  },
  {
    path: '**',
    redirectTo: 'time-left'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
