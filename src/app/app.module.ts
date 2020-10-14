import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { WeatherComponent } from './components/weather.component';
import { WeatherService } from './services/weather.service';
import { AutocompleteComponent } from './components/city.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    WeatherService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
