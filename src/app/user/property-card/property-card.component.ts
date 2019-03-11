import {Component, Input} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {flatMap, map} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';
import {Auth, Pages} from '../../../environments/routing';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'property-card',
  template: `
    <div class="container">
      <div class="card">
        <div class="row">
          <div class="col-md-4">
            <img class="property_image" style="width: 100%" *ngIf="property.property_photo; else noPhoto" [src]="property?.property_photo" alt="">
            <ng-template #noPhoto>No photo</ng-template>
          </div>
          <div class="col-md-8">
            <div class="container price">
                £{{property?.property_rent}}pcm/pp
            </div>
            <div class="container">
              <div class="title">{{property?.property_address}}, {{property?.post_code}}</div>
              <div class="description" style="margin-top: 16px;">{{property?.description}}</div>
              <div class="container" style="padding-bottom: 5px;">
                <div class="row " style="margin-top: 8px">
                  <i class="material-icons">local_hotel</i> {{property?.number_of_beds}}
                  <ng-container *ngIf="property?.is_student_property; else notStudent">
                    <i class="material-icons">person</i> Student Property
                  </ng-container>
                  <ng-template #notStudent>
                    <i class="material-icons">person</i> Professional Property
                  </ng-template>
                </div>
              </div>
            </div>
            <hr>
            <div class="container" style="margin-bottom: 8px;">
              <div class="row">
                <div class="col-md-10">
                  <ng-container *ngIf="property?.original_site === 'Andrews Online'">
                    <img class="original_site" src="assets/images/andrews.png" alt="sing up image">
                  </ng-container>
                  <ng-container *ngIf="property?.original_site === 'Zoopla'">
                    <img class="original_site" src="assets/images/zoopla.png" alt="sing up image">
                  </ng-container>
                  <ng-container *ngIf="property?.original_site === 'Right Move'">
                    <img class="original_site" src="assets/images/right.png" alt="sing up image">
                  </ng-container>
                  <ng-container *ngIf="property?.original_site === 'Prime Location'">
                    <img class="original_site" src="assets/images/prime.png" alt="sing up image">
                  </ng-container>
                </div>
                <div class="col-md-2">
                  <div *ngIf="!isLiked" (click)="likeProperty(property?.property_id)">
                    <img style="width: 30px; height: auto" src="assets/images/like1.png" alt="sing up image">
                  </div>
                  <div *ngIf="isLiked" (click)="unlikeProperty(property?.property_id)">
                    <img style="width: 30px; height: auto" src="assets/images/liked.png" alt="sing up image">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./property-card.component.scss']
})

export class PropertyCardComponent {
  @Input() property: any;
  public routes = {Auth};
  isLiked: boolean;
  constructor(private _user: UserService,
              private _auth: AuthService,
              private _toastr: ToastrService) {
    this.isLiked = false;

    if(this._auth.authenticated) {
      this._user.getUserById(this._auth.currentUserId).valueChanges().pipe(
        map((user: any) => {
          Object.keys(user.liked_properties).forEach((propertyId) => {
            if (propertyId === this.property.property_id) {
              this.isLiked = true;
            }
          })
        })
      ).subscribe();
    }
  }

  likeProperty(id: string) {
    if(this._auth.authenticated) {
      return this._user.likePropertyAndAddToUser(id);
    } else {
      this._toastr.error('You need to be signed in to like this property');
    }
  }

  unlikeProperty(id) {
    this._user.removeUserLikedProperty(id).subscribe(
      () => {this._toastr.success('Property unliked'); this.isLiked = false;}
    );
  }
}
