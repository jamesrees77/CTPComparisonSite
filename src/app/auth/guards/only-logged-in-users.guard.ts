import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {isNullOrUndefined} from 'util';
import {map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class OnlyLoggedinUsersGuard implements CanActivate {
  constructor(private router: Router,
              public afAuth: AngularFireAuth,
              private _toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      map(auth => {
        console.log('are you logged in?', auth);
        // if there is no authorisation for user then add toastr notification and redirect to sign in page
        if (isNullOrUndefined(auth)) {
          this.router.navigate(['/signin']);
          this._toastr.error('You must be logged in to view this page.');
          return false;
        } else {
          // if they are logged in then allow access
          return true;
        }
      })
    );
  }
}
