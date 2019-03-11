import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {Auth, Pages} from '../environments/routing';
import {SignupComponent} from './auth/signup/signup.component';
import {ProfileComponent} from './user/profile/profile.component';
import {OnlyLoggedinUsersGuard} from './auth/guards/only-logged-in-users.guard';
import {SigninComponent} from './auth/signin/signin.component';
import {DashboardComponent} from './user/dashboard/dashboard.component';
import {PropertiesComponent} from './user/properties/properties.component';
import {ProfileImageUploadComponent} from './auth/profile-image-upload/profile-image-upload.component';
import {LikedPropertiesComponent} from './user/liked-properties/liked-properties.component';

const appRoutes: Routes = [
  // AUTH
  // {path: '', redirectTo: Auth.signin, pathMatch: 'full'},
  {path: Auth.signin, component: SigninComponent},
  {path: Auth.signup, component: SignupComponent},
  {path: Auth.profile_image, component: ProfileImageUploadComponent},
  // USER
  {path: '', redirectTo: Pages.profile, pathMatch: 'full'},
  {path: Pages.profile, component: ProfileComponent, canActivate: [OnlyLoggedinUsersGuard]},
  {path: Pages.dashboard, component: DashboardComponent, canActivate: [OnlyLoggedinUsersGuard]},
  {path: Pages.properties, component: PropertiesComponent},
  {path: Pages.liked_properties, component: LikedPropertiesComponent, canActivate: [OnlyLoggedinUsersGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules
      // enableTracing: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
