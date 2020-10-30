import { OneDayWeatherComponent } from './one-day-weather.component';
import { DailyWeatherComponent } from './daily-weather.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'daily',
    component: DailyWeatherComponent,

  },
];
@NgModule({
  declarations: [DailyWeatherComponent,
                OneDayWeatherComponent
],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
],
  exports: [
      RouterModule,
      OneDayWeatherComponent
    ],
})
export class DailyWeatherModule {}
