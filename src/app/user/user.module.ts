import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {PropertiesComponent} from './properties/properties.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CommonModule} from '@angular/common';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    ProfileComponent,
    PropertiesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    ProfileComponent,
    PropertiesComponent,
    DashboardComponent
  ]
})
export class UserModule {
}
