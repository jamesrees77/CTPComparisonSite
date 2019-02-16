import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Pages} from '../../../environments/routing';

@Component({
  template: `
    <form [formGroup]="signInFormGroup">
      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input type="email" matInput placeholder="Placeholder" [formControlName]="'email'">
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Password</mat-label>
        <input type="password" matInput placeholder="Placeholder" [formControlName]="'password'">
      </mat-form-field>
    </form>
    <button (click)="signInWithEmail()">Sign In</button>
  `
})

export class SigninComponent implements OnInit {
  signInFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,
              private _auth: AuthService,
              private router: Router,
              ) {}

  ngOnInit(): void {
    this.signInFormGroup = this.initFormGroup();
  }

  initFormGroup() {
    return this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signInWithEmail() {
    return this._auth.signInWithEmailAndPassword(this.signInFormGroup.getRawValue())
      .subscribe(() => {
        this.router.navigate(['/', Pages.profile]);
      });
  }
}
