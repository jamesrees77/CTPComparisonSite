import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {PropertiesComponent} from './properties/properties.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CommonModule} from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import {LayoutsModule} from '../layouts/layouts.module';
import {NgAisModule} from 'angular-instantsearch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule
} from '@angular/material';
import {AgmCoreModule} from '@agm/core';
@NgModule({
  declarations: [
    ProfileComponent,
    PropertiesComponent,
    DashboardComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBkt8-2gfQup54j9xyQCQC8MBX7oPgfUMM'
    }),
    CommonModule,
    ChartsModule,
    LayoutsModule,
    NgAisModule.forRoot(),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    ProfileComponent,
    PropertiesComponent,
    DashboardComponent,
  ],
})
export class UserModule {
}
