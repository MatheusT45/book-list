import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private service: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: [null],
      email: [null],
      password: [null],
    });
  }

  onSubmit() {
    this.service.signup(this.form.value).subscribe((response) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['books']);
    });
  }

  onLoginClick() {
    this.router.navigate(['login']);
  }
}
