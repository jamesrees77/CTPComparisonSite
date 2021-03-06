import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {PropertyService} from './services/property.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './services/auth.service';
import {UserModule} from './user/user.module';
import {LayoutsModule} from './layouts/layouts.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {RouterModule} from '@angular/router';
import {UserService} from './services/user.service';
import { ToastrModule } from 'ngx-toastr';
import {StorageService} from './services/storage.service';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdsAuPmKNtsSAz-G3trSO9wGuow7XkVEs'
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),  // imports firebase/app needed for everything
    AngularFirestoreModule,                                       // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,                                        // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,                                     // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    // set timing and position of toastr notifications
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AppRoutingModule,
    UserModule,
    LayoutsModule,
    MDBBootstrapModule.forRoot(),
    ChartsModule,
  ],
  providers: [
    PropertyService,
    AuthService,
    UserService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
