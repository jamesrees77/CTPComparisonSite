import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule
} from '@angular/material';
import {OnlyLoggedinUsersGuard} from './guards/only-logged-in-users.guard';
import {ProfileImageUploadComponent} from './profile-image-upload/profile-image-upload.component';
import {LayoutsModule} from '../layouts/layouts.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ProfileImageUploadComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    LayoutsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    BrowserModule
  ],
  exports: [
    SignupComponent,
    SigninComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule
  ],
  providers: [
    OnlyLoggedinUsersGuard
  ]
})
export class AuthModule {}
