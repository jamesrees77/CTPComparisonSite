import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-3" *ngFor="let property$ of (properties$ | async)">
          <ng-container *ngIf="property$ | async as property">
            {{property.property_id}} 
          </ng-container>
        </div>
      </div>
    </div>
  `,
})

export class ProfileComponent implements OnInit {
  public properties$: Observable<any>;
  public user$: Observable<any>;
  constructor(private _user: UserService) {
    this.user$ = this._user.getUserById().valueChanges();

    this.properties$ = this.user$.pipe(
      flatMap((user) => this._user.getAllUserLikedProperties(user))
    );
  }

  ngOnInit(): void {

  }
}
