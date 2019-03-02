import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {flatMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PropertyService} from './property.service';
import * as firebase from 'firebase/app';
@Injectable()
export class UserService {
  public usersCollection: AngularFirestoreCollection<any>;
  public user$: Observable<any>;
  public user: any;
  public test;
  public userDoc: AngularFirestoreDocument<any>;
  constructor(private afs: AngularFirestore,
              private _auth: AuthService,
              private afAuth: AngularFireAuth,
              private _property: PropertyService) {
    this.usersCollection = afs.collection<any>('users');

    this.user$ = this.afAuth.authState.pipe(
      switchMap(
        (auth) =>
          (auth)
            ? this.afs.doc(`users/${auth.uid}`).valueChanges()
            : of(null)
      ));

    this.user$.subscribe((user) => {
      this.user = user;
    });
    console.log('USER SERVICE: ', this.user)
  }

  get userDb() {
      return this.user;
  }
  getUserById(id) {
    return this.usersCollection.doc(id);
  }

  likePropertyAndAddToUser(id) {
    const item = {
      liked_properties: {
        [id]: true
      }
    };
    return fromPromise(this.usersCollection.doc(this._auth.currentUserId).set(item, {merge: true}));
  }

  getAllUserLikedProperties(user) {
    const likedProperties = user.liked_properties;
    const ids = [];
    Object.keys(likedProperties).forEach((propertyId ) => {
      ids.push(propertyId);
    })
    const docs = [];
    ids.map(id => {
      console.log(id)
      docs.push(this._property.getPropertyById(id).valueChanges());
    });
    return of(docs);
  }

  setProfileImage(url) {
    const item = {
      profile_image_url: url
    };
    return fromPromise(this.usersCollection.doc(this._auth.currentUserId).set(item, {merge: true}));
  }


}
