import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Auth} from '../../../environments/routing';

@Component({
selector: 'app-sign-up',
template: `
  <standard-page>
    <section class="signup" style="margin-top: 30px">
      <div class="container">
        <div class="signup-content">
          <div class="signup-form">
            <h2 class="form-title">Sign up</h2>
            <form [formGroup]="signUpFormGroup" class="register-form" id="register-form">
              <div class="form-group">
                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                <input [formControlName]="'first_name'" type="text" name="name" id="name" placeholder="First Name"/>
              </div>
              <div class="form-group">
                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                <input [formControlName]="'last_name'" type="text" name="last_name" id="last_name" placeholder="Last Name"/>
              </div>
              <div class="form-group">
                <label for="email"><i class="zmdi zmdi-email"></i></label>
                <input [formControlName]="'email'" type="email" name="email" id="email" placeholder="Your Email"/>
              </div>
              <div class="form-group">
                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                <input [formControlName]="'password'" type="password" name="pass" id="pass" placeholder="Password"/>
              </div>
              <div class="form-group">
                <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                <select  [formControlName]="'current_location'" required>
                  <option value="" disabled selected>Preferred Bristol Post code</option>
                  <option  *ngFor="let code of postCodes" [value]="'BS' + code">BS{{code}}</option>
                </select>
              </div>
              <div class="form-group form-button">
                <input type="button" (click)="createUserWithEmailAndPassword()" name="signup" id="signup" class="form-submit" value="Register"/>
              </div>
            </form>
          </div>
          <div class="signup-image">
            <figure><img src="/assets/images/signup-image.jpg" alt="sing up image"></figure>
            <div [routerLink]="['/' + routes.Auth.signin]" class="signup-image-link" style="cursor: pointer">I am already member</div>
          </div>
        </div>
      </div>
    </section>
  </standard-page>
`,
  styleUrls: ['../auth.component.scss']
})

export class SignupComponent implements OnInit {
  signUpFormGroup: FormGroup;
  routes = {Auth};
  public postCodes =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16];
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
      password: ['', Validators.required],
      current_location: ['', Validators.required]
    });
  }

  createUserWithEmailAndPassword() {
    return this._auth.createUserWithEmailAndPassword(this.signUpFormGroup.getRawValue())
      .subscribe(() => this.router.navigate(['/' + Auth.profile_image]));
  }
}
