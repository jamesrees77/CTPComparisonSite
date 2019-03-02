import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {flatMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <standard-page>
      <div class="container">
        <div class="row">
          <div class="col-md-3" *ngFor="let property$ of (properties$ | async)">
            <ng-container *ngIf="property$ | async as property">
              {{property.property_id}}
            </ng-container>
          </div>
        </div>
      </div>
    </standard-page>
  `,
})

export class ProfileComponent implements OnInit {
  public properties$: Observable<any>;
  public user$: Observable<any>;
  constructor(private _user: UserService,
              private _auth: AuthService) {
    this.user$ = this._user.getUserById(this._auth.currentUserId).valueChanges();

    this.properties$ = this.user$.pipe(
      flatMap((user) => this._user.getAllUserLikedProperties(user))
    );
  }

  ngOnInit(): void {

  }
}
