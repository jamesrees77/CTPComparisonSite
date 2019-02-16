import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Auth} from '../../../environments/routing';

@Component({
selector: 'app-sign-up',
template: `
<form [formGroup]="signUpFormGroup">
  <mat-form-field appearance="outline">
    <mat-label>Outline form field</mat-label>
    <input matInput placeholder="Placeholder" [formControlName]="'first_name'">
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>Outline form field</mat-label>
    <input matInput placeholder="Placeholder" [formControlName]="'last_name'">
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>Outline form field</mat-label>
    <input matInput placeholder="Placeholder" [formControlName]="'email'">
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>Outline form field</mat-label>
    <input type="password" matInput placeholder="Placeholder" [formControlName]="'password'">
  </mat-form-field>
</form>
<button (click)="createUserWithEmailAndPassword()">Sign Up</button>
`,
})

export class SignupComponent implements OnInit {
  signUpFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,
              private _auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.signUpFormGroup = this.initFormGroup();
  }
  //

  initFormGroup() {
    return this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createUserWithEmailAndPassword() {
    return this._auth.createUserWithEmailAndPassword(this.signUpFormGroup.getRawValue())
      .subscribe(() => this.router.navigate(['/' + Auth.profile_image]));
  }
}
