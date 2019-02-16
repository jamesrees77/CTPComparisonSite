import {Component} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  template: `
    <label for="invoice-upload" class="bold-800 document-upload text-center">
      <div class="upload_image text-center">upload image</div>
      <input (change)="uploadProfileImage($event)" type="file" class="input-file" id="invoice-upload">
    </label>
  `,
})

export class ProfileImageUploadComponent {
  constructor(private _storage: StorageService,
              private _auth: AuthService,
              private _user: UserService,
              private _router: Router) {}

  uploadProfileImage(file) {
    this._storage.uploadFile(file, `user/${this._auth.currentUserId}/profile`)
      .pipe(
        tap(() => {
          this._storage.downloadURL.subscribe(url => {
            this._user.setProfileImage(url).subscribe();
          });
        })
      )
      .subscribe(
        success => {
          this._router.navigate(['/profile']);
        },
        error => console.log(error)
      );
  }

}
