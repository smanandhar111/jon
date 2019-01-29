import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface WeatherInfo {
  name: string;
  description: string;
  main: {
    humidity: number;
    temp: number;
  };
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  defaultCity = 'Minneapolis';
  inputCity: string;
  unit = 'Imperial';
  temp: number;
  weatherConditions: string;
  private readonly rootUrl: string = 'http://api.openweathermap.org/data/2.5/weather?';
  private readonly appId: string = '641f2c4c590661bd176222ddd81e362f';
  editCity = false;
  weatherInfo;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getWeather();

    // console.log(navigator.geolocation.getCurrentPosition());
  }
  getWeather() {
    const url = `${this.rootUrl}q=${this.defaultCity}&APPID=${this.appId}&units=${this.unit}`;
    this.http.get<WeatherInfo>(url)
      .subscribe((data) => {
        console.log(data);
          this.weatherInfo = data;
          this.temp = data.main.temp;
          this.weatherConditions = this.weatherInfo.weather[0].main;

          this.roundUp();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('ClientSide Error');
          } else {
            console.log('Serverside Error');
          }
        });
  }
  roundUp() {
    this.temp = Math.round(this.temp);
  }
  updatelocation(inputCity) {
    this.defaultCity = this.inputCity;
    this.getWeather();
    this.inputCity = '';
    this.editCity = false;
  }
  editCityActive(): void {
    this.editCity = true;
  }
  clearEdit() {
    this.editCity = false;
  }
}
