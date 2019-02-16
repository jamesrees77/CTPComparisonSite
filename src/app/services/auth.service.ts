import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {fromPromise} from 'rxjs/internal-compatibility';
import {flatMap, switchMap} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  public usersCollection: AngularFirestoreCollection<any>;
  public authState: null;
  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
    this.usersCollection = afs.collection<any>('users');
    this.afAuth.authState.subscribe((auth: any) => {
      this.authState = auth;
    });
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
      const item = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_image_url: '',
        uid: uid,
      };
      return fromPromise(this.usersCollection.doc(uid).set(item, {merge: true}));
  }

  createUserWithEmailAndPassword(user: any) {
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
