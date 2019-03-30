import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Auth, Pages} from '../../../environments/routing';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'standard-page',
  template: `
    <mat-toolbar >
      <mat-toolbar-row >
        <img src="/assets/images/lendylogoblue.png" alt="" [routerLink]="['/']" style="width: 125px; height: auto">
        <span class="example-spacer"></span>
        <div class="nav-item" style="font-size: 12px;" [routerLink]="['/' + routes.Pages.properties]">properties</div>
        <div class="nav-item" style="font-size: 12px;" [routerLink]="['/' + routes.Pages.dashboard]">dashboard</div>
          <div class="nav-item" style="font-size: 12px;" [routerLink]="['/' + routes.Auth.signin]" *ngIf="!_auth.authenticated">login</div>
          <div class="nav-item" style="font-size: 12px;" [routerLink]="['/' + routes.Auth.signup]" *ngIf="!_auth.authenticated">signup</div>
        <div class="menu" *ngIf="_auth.authenticated">
          <img [matMenuTriggerFor]="menu" *ngIf="user$ | async as user" [src]="user?.profile_image_url">
          <mat-menu #menu="matMenu">
            <button mat-menu-item [routerLink]="['/' + routes.Pages.profile]">profile</button>
            <button mat-menu-item (click)="logout()">logout</button>
          </mat-menu>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
    <ng-content></ng-content>
  `,
  styleUrls: ['./standard-page.component.scss']
})

export class StandardPageComponent implements OnInit{
  routes = {Pages, Auth};
  public user$: Observable<any>;
  constructor(private router: Router,
              public _auth: AuthService,
              private _user: UserService) {
    console.log(this._auth.authenticated);
  }

  ngOnInit(): void {
    if(this._auth.currentUser) {
      this.user$ = this._user.getUserById(this._auth.currentUserId).valueChanges();
    }
  }

  logout() {
    return this._auth.logout()
      .subscribe(() => this.router.navigate(['/' + Auth.signin]));
  }
}
