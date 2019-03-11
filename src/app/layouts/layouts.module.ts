import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StandardPageComponent} from './standard-page/standard-page.component';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import{SideNavComponent} from './side-nav/side-nav.component';

@NgModule({
  declarations: [
    StandardPageComponent,
    SideNavComponent
  ],
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    StandardPageComponent,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    SideNavComponent
  ]
})
export class LayoutsModule {
}
