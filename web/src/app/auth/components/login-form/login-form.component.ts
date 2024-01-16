import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      username: [null],
      password: [null],
    });

    if (this.authService.isAuthenticated) {
      this.router.navigate(['books']);
    }
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['books']);
      },
      (error) => {
        this._snackBar.open(Object.values(error.error).join(' '), 'Close');
      }
    );
  }

  onSignupClick() {
    this.router.navigate(['signup']);
  }
}
