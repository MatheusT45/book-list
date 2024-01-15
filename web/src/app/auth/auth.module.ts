import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
  declarations: [LoginFormComponent, SignupFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
