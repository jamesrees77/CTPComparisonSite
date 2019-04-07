import {Injectable, OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {fromPromise} from 'rxjs/internal-compatibility';
import {flatMap, switchMap} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {current} from 'codelyzer/util/syntaxKind';

@Injectable()
export class AuthService implements OnInit {
  public usersCollection: AngularFirestoreCollection<any>;
  public authState: null;

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
    this.usersCollection = afs.collection<any>('users');
    this.afAuth.authState.subscribe((auth: any) => {
      this.authState = auth;
    });
  }

  ngOnInit() {

  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user
  get currentUser(): any {
    return this.authenticated ? this.afAuth.auth.currentUser : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.currentUser.uid : null;
  }

  createUserModelOnSignUp(uid: string, user: any) {
    // create user model
      const item = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_image_url: '',
        uid: uid,
        liked_properties: {},
        current_location: user.current_location
      };
      // add to firebase
      return fromPromise(this.usersCollection.doc(uid).set(item, {merge: true}));
  }

  createUserWithEmailAndPassword(user: any) {
    //take users email and password and create them an account within firestore database
    return fromPromise(firebase.auth().createUserWithEmailAndPassword(user.email, user.password))
      .pipe(
        flatMap((auth) => {
          console.log(auth.user.uid);
          return this.createUserModelOnSignUp(auth.user.uid, user);
        })
      );
  }


  signInWithEmailAndPassword(user): Observable<any> {
    return fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      )
    );
  }

  logout() {
    return fromPromise(this.afAuth.auth.signOut());
  }
}
