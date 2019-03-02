import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class PropertyService {
  public propertiesCollection: AngularFirestoreCollection<any>;


  constructor(private afs: AngularFirestore) {
    this.propertiesCollection = afs.collection<any>('properties');
  }

  getPropertyById(id) {
    return this.propertiesCollection.doc(id);
  }

  getAllProperties() {
    return this.afs.collection('properties', ref =>
    ref.where('post_code', '>', '')
    );
  }

}
