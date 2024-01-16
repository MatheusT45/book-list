import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, of } from 'rxjs';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly API =
    'https://api.hgbrasil.com/weather?format=json-cors&key=4e478454';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<{ results: Weather }> {
    return this.http.get<{ results: Weather }>(this.API).pipe(
      first(),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
}
