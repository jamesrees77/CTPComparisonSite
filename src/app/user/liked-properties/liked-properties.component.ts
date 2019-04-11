import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {flatMap} from 'rxjs/operators';
import {Pages} from '../../../environments/routing';

@Component({
  template: `
    <standard-page>
      <side-nav class="example-container">
          <ng-container *ngFor="let property$ of (properties$ | async)">
            <ng-container *ngIf="property$ | async as property">
              <property-card [property]="property"></property-card>
            </ng-container>
          </ng-container>
      </side-nav>
    </standard-page>
  `,
  styleUrls: ['./liked-properties.component.scss']
})
export class LikedPropertiesComponent implements OnInit{
  public user$: Observable<any>;
  public properties$: Observable<any>;
  public routes = {Pages};
  constructor(private _user: UserService,
              private _auth: AuthService) {
    // if(this._auth.currentUserId) {
    //   console.log('yeah bitch');
    //   this.user$ = this._user.getUserById(this._auth.currentUserId).valueChanges();
    //
    //   this.properties$ = this.user$.pipe(
    //     tap((user: any) => this._user.getAllUserLikedProperties(user))
    //   );
    // }

  }

  ngOnInit(): void {
    this.user$ = this._user.getUserById(this._auth.currentUserId).valueChanges();

    this.properties$ = this.user$.pipe(
      flatMap((user:any) => this._user.getAllUserLikedProperties(user))
    )
  }
}
