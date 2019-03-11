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
import {PropertyCardComponent} from './property-card/property-card.component';
import {LikedPropertiesComponent} from './liked-properties/liked-properties.component';
import {RentMapUkComponent} from './rent-map-uk/rent-map-uk.component';
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import *  as FusionMaps from 'fusioncharts/fusioncharts.maps';
import * as England from 'fusionmaps/maps/fusioncharts.england';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, FusionMaps, England, FusionTheme);
@NgModule({
  declarations: [
    ProfileComponent,
    PropertiesComponent,
    DashboardComponent,
    PropertyCardComponent,
    LikedPropertiesComponent,
    RentMapUkComponent
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
    FormsModule, ReactiveFormsModule,
    FusionChartsModule
  ],
  exports: [
    ProfileComponent,
    PropertiesComponent,
    DashboardComponent,
    PropertyCardComponent,
    LikedPropertiesComponent,
    RentMapUkComponent
  ],
})
export class UserModule {
}
