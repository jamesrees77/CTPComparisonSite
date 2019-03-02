import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Pages, Auth} from '../../../environments/routing';

@Component({
  template: `
    <standard-page>
      <section class="sign-in" style="margin-top: 25px">
        <div class="container">
          <div class="signin-content">
            <div class="signin-image">
              <figure><img src="assets/images/signin-image.jpg" alt="sing up image"></figure>
              <div [routerLink]="['/' + routes.Auth.signup]" class="signup-image-link">Not yet a member?</div>
            </div>

            <div class="signin-form">
              <h2 class="form-title">Sign In</h2>
              <form [formGroup]="signInFormGroup" class="register-form" id="login-form">
                <div class="form-group">
                  <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                  <input [formControlName]="'email'" type="text" name="email" id="email" placeholder="Email"/>
                </div>
                <div class="form-group">
                  <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                  <input [formControlName]="'password'" type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                </div>
                <div class="form-group form-button">
                  <button (click)="signInWithEmail()" type="button" name="signin" id="signin" class="form-submit" >Sign in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </standard-page>
  `,
  styleUrls: ['../auth.component.scss']
})

export class SigninComponent implements OnInit {
  routes = {Auth};
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
