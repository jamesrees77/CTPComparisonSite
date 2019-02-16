import {NgModule} from '@angular/core';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
} from '@angular/material';
import {OnlyLoggedinUsersGuard} from './guards/only-logged-in-users.guard';
import {ProfileImageUploadComponent} from './profile-image-upload/profile-image-upload.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ProfileImageUploadComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  exports: [
    SignupComponent,
    SigninComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  providers: [
    OnlyLoggedinUsersGuard
  ]
})
export class AuthModule {}
