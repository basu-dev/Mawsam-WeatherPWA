import { OneDayWeatherComponent } from './partial-weather.component';
import { DailyWeatherComponent } from './daily-weather.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HourlyWeatherComponent } from './hourly-weather.component';
const routes: Routes = [
  {
    path: 'daily',
    component: DailyWeatherComponent,
  },
  {
    path: 'hourly',
    component: HourlyWeatherComponent,
  },
];
@NgModule({
  declarations: [
    DailyWeatherComponent,
    OneDayWeatherComponent,
    HourlyWeatherComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule, OneDayWeatherComponent],
})
export class DailyWeatherModule {}
