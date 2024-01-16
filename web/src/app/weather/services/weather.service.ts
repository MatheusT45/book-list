import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, of } from 'rxjs';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly API = 'https://api.hgbrasil.com/weather?format=json-cors';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  getWeather(): Observable<{ results: Weather }> {
    return this.http.get<{ results: Weather }>(this.API).pipe(
      first(),
      catchError((error) => {
        this._snackBar.open(
          'Não foi possível obter a previsão do tempo',
          'Close'
        );
        console.log(error);
        return of(null);
      })
    );
  }
}
