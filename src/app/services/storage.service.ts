import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import {AuthService} from './auth.service';
import { FirebaseApp } from 'angularfire2';
import {finalize} from 'rxjs/operators';



@Injectable()
export class StorageService {
  public downloadURL: Observable<string>;
  public uploadPercent: Observable<number>;

  constructor(
    private _auth: AuthService,
    private fb: FirebaseApp,
    private storage: AngularFireStorage
  ) {
  }

  // create random string to avoid images with same name
  private createRandomString = (): string =>
    Math.random()
      .toString(36)
      .substring(7);

  private getPercentageChanges = (task) => {
    return task.percentageChanges();
  };

  private getDownloadURL = (task) => {
    return task.downloadURL();
  };

  // public uploadFile(event: any, path: string) {
  //   const file = event.target ? event.target.files[0] : event; // all files uploaded or allow FileList
  //   const name = `${this.createRandomString()}-${file.name}`;
  //   const finalPath = `${path}/${name}`; // this is the format on how we will store files in our storage
  //   const task = this.storage.upload(finalPath, file);
  //
  //   this.uploadPercent = this.getPercentageChanges(task); // get percentage of download
  //   this.downloadURL = this.getDownloadURL(task); // get uploaded url file
  //
  //   return this.getDownloadURL(task).map((downloadURL) => {
  //     return {name, downloadURL};
  //   });
  // }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `${this._auth.currentUserId}/profile_image`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    ).subscribe();
  }
}
