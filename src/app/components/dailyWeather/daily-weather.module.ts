import { DailyWeatherComponent } from './daily-weather.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: DailyWeatherComponent,
  },
];
@NgModule({
  declarations: [DailyWeatherComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
],
  exports: [DailyWeatherComponent],
})
export class DailyWeatherModule {}
