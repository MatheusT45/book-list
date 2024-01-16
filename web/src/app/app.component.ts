import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { AppMaterialModule } from './shared/app-material/app-material.module';
import { AuthService } from './auth/services/auth.service';
import { WeatherComponent } from './weather/components/weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppMaterialModule, WeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Bookshelf';

  constructor(private router: Router, private authService: AuthService) {}

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
