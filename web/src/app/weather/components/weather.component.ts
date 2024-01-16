import { CommonModule } from '@angular/common';
import { Weather } from './../models/weather';
import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, AppMaterialModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  weather: Weather;
  iconSvg = '/assets/weather-icons/';
  loading: boolean = true;

  constructor(service: WeatherService) {
    service.getWeather().subscribe((response) => {
      this.weather = response.results;
      this.iconSvg += this.weather.condition_slug + '.svg';
      this.loading = false;
    });
  }
}
