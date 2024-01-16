import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-form',
  standalone: false,
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      username: [null],
      email: [null],
      password: [null],
    });

    if (this.authService.isAuthenticated) {
      this.router.navigate(['books']);
    }
  }

  onSubmit() {
    this.authService.signup(this.form.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['books']);
      },
      (error) => {
        this._snackBar.open(Object.values(error.error).join(' '), 'Close');
      }
    );
  }

  onLoginClick() {
    this.router.navigate(['login']);
  }
}
