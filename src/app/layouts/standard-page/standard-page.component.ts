import {Component} from '@angular/core';
import {Auth, Pages} from '../../../environments/routing';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'standard-page',
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <span>Custom Toolbar</span>
        <span class="example-spacer"></span>
        <div class="nav-item" style="font-size: 12px;" [routerLink]="['/' + routes.Pages.properties]">properties</div>
        <div class="nav-item" style="font-size: 12px;" [routerLink]="['/' + routes.Pages.dashboard]">dashboard</div>
          <div class="nav-item" style="font-size: 12px;" [routerLink]="['/' + routes.Auth.signin]" *ngIf="!_auth.authenticated">login</div>
          <div class="nav-item" style="font-size: 12px;" [routerLink]="['/' + routes.Auth.signup]" *ngIf="!_auth.authenticated">signup</div>
        <div class="menu" *ngIf="_auth.authenticated">
          <mat-icon [matMenuTriggerFor]="menu">person</mat-icon>
          <mat-menu #menu="matMenu">
            <button mat-menu-item [routerLink]="['/' + routes.Pages.profile]">profile</button>
            <button mat-menu-item (click)="logout()">logout</button>
          </mat-menu>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ['./standard-page.component.scss']
})

export class StandardPageComponent {
  routes = {Pages, Auth};
  constructor(private router: Router,
              public _auth: AuthService) {
  }
  logout() {
    return this._auth.logout()
      .subscribe(() => this.router.navigate(['/' + Auth.signin]));
  }
}
