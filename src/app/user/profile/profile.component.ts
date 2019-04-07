import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {flatMap, map, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  template: `
    <standard-page>
      <side-nav class="example-container">
        <div class="container-fluid" *ngIf="user$ | async as user">
          <div class="row">
            <div class="col-lg-4 col-md-5">
              <div class="card card-user">
                <div class="image">
                  <img src="assets/images/background.jpg" alt="..."/>
                </div>
                <div class="content">
                  <div class="author">
                    <img class="avatar border-white" [src]="user.profile_image_url" alt="..."/>
                    <h4 class="title">{{user?.first_name}} {{user?.last_name}}<br />
                    </h4>
                  </div>
                  <p class="description text-center">
                    <ng-container *ngIf="user.bio; else noBio">
                      {{user.bio}}
                    </ng-container>
                    <ng-template #noBio>
                      Tell us about yourself.
                    </ng-template>
                  </p>
                </div>
                <hr>
              </div>
            </div>
            <div class="col-lg-8 col-md-7">
              <div class="card">
                <div class="header">
                  <h4 class="title">Edit Profile</h4>
                </div>
                <div class="content">
                  <!--initiate form-->
                  <form [formGroup]="profileFormGroup">
                    
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <!-- user form input for changing name-->
                          <label>First Name</label>
                          <input [formControlName]="'first_name'" type="text" class="form-control border-input" placeholder="First Name" >
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <!-- user form input for changing surname-->
                          <label>Last Name</label>
                          <input [formControlName]="'last_name'"  type="text" class="form-control border-input" placeholder="Last Name">
                        </div>
                      </div>
                    </div>
                    <!-- user form input for changing address-->
                    <div [formGroupName]="'address'">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Address</label>
                            <input type="text" class="form-control border-input" placeholder="Home Address" [formControlName]="'first_line_address'">
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>City</label>
                            <input type="text" class="form-control border-input" placeholder="City" [formControlName]="'city'">
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Country</label>
                            <input type="text" class="form-control border-input" placeholder="Country" [formControlName]="'country'">
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Postal Code</label>
                            <input type="text" class="form-control border-input" placeholder="ZIP Code" [formControlName]="'post_code'">
                          </div>
                        </div>
                      </div>
                    </div>
                

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>About Me</label>
                          <textarea rows="5" class="form-control border-input" placeholder="Here can be your description" [formControlName]="'bio'">
                            </textarea>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <button *ngIf="!is_disabled" type="button" (click)="updateUserProfileData()" class="btn btn-info btn-fill btn-wd">Update Profile</button>
                      <button *ngIf="is_disabled" type="button" (click)="editForm()" class="btn btn-info btn-fill btn-wd">Edit info</button>
                    </div>
                    <div class="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>


          </div>
        </div>
      </side-nav>
    </standard-page>
  `,
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public user$: Observable<any>;
  profileFormGroup: FormGroup;
  is_disabled: boolean;
  constructor(private _user: UserService,
              private _auth: AuthService,
              private _formBuilder: FormBuilder,
              private _toastr: ToastrService) {

  }

  ngOnInit(): void {

    this.profileFormGroup = this.initFormGroup();

    this.user$ = this._user.getUserById(this._auth.currentUserId).valueChanges().pipe(
      tap(user => this.profileFormGroup.patchValue(user))
    );

    this.profileFormGroup.disable();
    this.is_disabled = true;
  }

  initFormGroup() {
    // create the reactive form for profile page
    return this._formBuilder.group({
      first_name: '',
      last_name: '',
      address: this._formBuilder.group({
        first_line_address: '',
        city: '',
        country: '',
        post_code: ''
      }),
      bio: ''
    })
  }

  editForm() {
    this.profileFormGroup.enable();
    this.is_disabled = false;
  }

  updateUserProfileData() {
    this._user.updateUserProfileData(this.profileFormGroup.getRawValue()).subscribe(
      () => {
        this._toastr.success('Profile information updated');
        this.is_disabled = true;
        this.profileFormGroup.disable();
      }
    );
  }
}
