import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import {AuthService} from './auth.service';
import { FirebaseApp } from 'angularfire2';
import {finalize} from 'rxjs/operators';
import {AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';

@Injectable()
export class StorageService {
  public task: AngularFireUploadTask;
  public fileRef: AngularFireStorageReference;
  public uploadPercent$: Observable<number>;

  constructor(
    private _auth: AuthService,
    private fb: FirebaseApp,
    private _storage: AngularFireStorage
  ) {
  }

  // create random string to avoid images with same name
  private createRandomString = (): string =>
    Math.random()
      .toString(36)
      .substring(7);


  get downloadURL(): Observable<any> {
    return this.fileRef.getDownloadURL();
  }

  /*
   * Upload file to Storage (https://github.com/angular/angularfire2/blob/master/docs/storage/storage.md)
   */
  uploadFile(event: any, path: string, file_name?: string): Observable<UploadTaskSnapshot | undefined> {
    const file = event.target.files[0];
    // if a new file name is present use it, else generate random string and use original file name
    const name = (file_name) ? file_name : `${this.createRandomString()}-${file.name}`;
    const filePath = `${path}/${name}`;

    this.task = this._storage.upload(filePath, file);
    this.fileRef = this._storage.ref(filePath);
    this.uploadPercent$ = this.task.percentageChanges(); // get percentage of download

    return this.task.snapshotChanges();
  }
}
