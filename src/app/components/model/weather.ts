export interface Weather{
    temp?:number,
    max_temp?:number,
    min_temp?:number,
    city?:string,
    pressure?:number,
    sunRise?:number,
    sunSet?:number,
    humidity?:number,
    feels_like?:number,
    main?:string,
    icon?:string,
    description?:string
}
export interface OneWeather{
    current?:Weather,
    hourly?:Weather[],
    daily?:Weather[]


}