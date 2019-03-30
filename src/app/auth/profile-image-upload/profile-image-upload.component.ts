import {Component} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {last, mergeMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  template: `
    <standard-page>
      <div class="container text-center" style="margin-top: 100px">
        <label for="invoice-upload" class="bold-800 document-upload text-center">
          <img [src]="profile_image" alt="" style="width: 200px; height: auto; margin-bottom: 25px">
          <div style="cursor: pointer; background-color: #262637; color: white; padding: 8px; border: 1px solid #262637; border-radius: 5px"> Upload Image</div>
          <input style="display: none" (change)="uploadProfileImage($event)" type="file" class="input-file" id="invoice-upload">
        </label>
        <div class="skip_button" style="cursor: pointer" (click)="skip()">skip</div>
      </div>
    </standard-page>
  `,
})

export class ProfileImageUploadComponent {

  profile_image = "/assets/images/profile_icon.png";
  constructor(private _storage: StorageService,
              private _auth: AuthService,
              private _user: UserService,
              private _router: Router) {}

  uploadProfileImage(file) {
    this._storage.uploadFile(file, `user/${this._auth.currentUserId}/profile`)
      .pipe(
        last(),
        mergeMap(() => this._storage.downloadURL),
        tap(url => {
          this.profile_image = url;
          this._user.setProfileImage(url)
        })
      )
      .subscribe(
        success => {
          console.log('Success upload Profile Picture');
          this._router.navigate(['/profile']);
        },
        error => console.log(error)
      );
  }

  skip() {
    this._user.setProfileImage(this.profile_image).subscribe(
      () =>this._router.navigate(['/profile'])
    )
  }

}
