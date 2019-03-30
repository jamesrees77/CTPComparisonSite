import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {Pages} from '../../../environments/routing';
@Component({
  selector: 'side-nav',
  template: `
    <mat-sidenav-container class="example-container">
      <mat-sidenav mode="side" style="width: 200px; background-color: #262637; position: fixed; color: white;" opened >
        <div class="container text-center">
          <img src="/assets/images/lendylogowhite.png" alt="" [routerLink]="['/']" style="width: 125px; height: auto; margin-left: auto; margin-right: auto">

        </div>
        <div class="container text-center" *ngIf="user$ | async as user">
          <img style="width:80px; height: 80px; border-radius: 50%; margin-bottom: 8px" [src]="user.profile_image_url" alt="">
          <div class="user">
            {{user.first_name}} {{user.last_name}}
          </div>
        </div>
        <div class="nav-item" [routerLink]="['/' + routes.Pages.dashboard]"  routerLinkActive="active-link">Dashboard</div>
        <div class="nav-item" [routerLink]="['/' + routes.Pages.profile]" routerLinkActive="active-link">Profile</div>
        <div class="nav-item" [routerLink]="['/' + routes.Pages.liked_properties]" routerLinkActive="active-link">Liked Properties</div>
      </mat-sidenav>
      <mat-sidenav-content >
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
    
  `,
  styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent implements OnInit{
  public user$: Observable<any>;
  public routes = {Pages};
  constructor(private _user: UserService,
              private _auth: AuthService) {}

  ngOnInit(): void {
    this.user$ = this._user.getUserById(this._auth.currentUserId).valueChanges()
  }
}
