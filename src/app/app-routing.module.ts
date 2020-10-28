import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
  },
  {
    path: 'daily',
    loadChildren: () =>
      import('./components/dailyWeather/daily-weather.module').then(
        (m) => m.DailyWeatherModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
