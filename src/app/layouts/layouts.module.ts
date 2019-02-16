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
@NgModule({
  declarations: [
    StandardPageComponent
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
    MatMenuModule
  ]
})
export class LayoutsModule {
}
