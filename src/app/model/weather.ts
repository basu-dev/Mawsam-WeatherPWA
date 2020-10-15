export interface OneWeather {
  current?: CurrentWeather;
  hourly?: DailyWeather[];
  daily?: DailyWeather[];
  timezone?: string;
}
export interface CurrentWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: Weather;
  wind_deg: number;
  wind_speed: number;
}
export interface PartialWeather{
  current?:number;
  min_temp?:number;
  max_temp?:number;
}
export interface Weather {
  main: string;
  icon: string;
  description: string;
}
export interface DailyWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like:
    | { day: number; night: number; eve: number; morn: number }
    | number;
  humidity: number;
  pop: number;
  pressure: number;
  sunrise?: number;
  sunset?: number;
  temp?: { day: number; min: number; max: number; night: number; eve: number };
  uvi: number;
  weather: Weather;
  wind_deg: number;
  wind_speed: number;
}
export interface Place {
  added?:boolean;
  name?: string;
  lat?: number;
  lon?: number;
  temp?:PartialWeather;
}
