import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PropertyService} from './property.service';
import {FirebaseApp} from '@angular/fire';
import {forEach} from '@angular/router/src/utils/collection';

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
              private _property: PropertyService,
              private fb: FirebaseApp) {
    this.usersCollection = afs.collection<any>('users');

    if(this._auth.authenticated) {
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
    }

  }

  get userDb() {
      return this.user;
  }
  getUserById(id) {
    return this.usersCollection.doc(id);
  }

  // Takes property id (from firestore) as argument
  likePropertyAndAddToUser(id) {
    // create item to be added to firestore as an object with the id as the key
    const item = {
      liked_properties: {
        [id]: true
      }
    };
    //set item to user model on firestore
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

  updateUserCurrentLocation(location) {
    return this.usersCollection.doc(this._auth.currentUserId).set(location, {merge: true});
  }
  updateUserProfileData(info: any) {
    return fromPromise(this.usersCollection.doc(this._auth.currentUserId).set(info, {merge: true}));
  }


  removeUserLikedProperty(property_id: string) {

    const usersDocRef = this.usersCollection.doc(
      this._auth.currentUserId
    ).ref;

    //return the user model from firestore
    return fromPromise(this.fb.firestore().runTransaction(transaction => {
      return transaction.get(usersDocRef)
        .then((data: any) => {
          // user holds the full object of the current user
          const user = data.data();
          const likedProperties = user.liked_properties;
        // loops through object keys of like property
            Object.keys(likedProperties).forEach((key, index) => {
              // if the object key is = to the property id passed in as an argument to delete, then delete it
              if (key === property_id) {
               delete likedProperties[key]
              }
            });
          // then reset like properties as new object with that property removed
          const item = {
            liked_properties: likedProperties
          };
          //update firestore
          transaction.update(usersDocRef, item);
        });
    }))
  }


}
