import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class PropertyService {
  public propertiesCollection: AngularFirestoreCollection<any>;


  constructor(private afs: AngularFirestore) {
    this.propertiesCollection = afs.collection<any>('prime_location');
  }

  getPropertyById(id) {
    return this.propertiesCollection.doc(id);
  }

  getAllProperties() {
    return this.afs.collection('prime_location', ref =>
    ref.where('post_code', '>', '')
    );
  }

}
