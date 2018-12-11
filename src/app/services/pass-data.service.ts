import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PassModel } from '../models/passModel';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  passDataCollection: AngularFirestoreCollection<PassModel[]>;
  passDataDoc: AngularFirestoreDocument<PassModel>;
  passData: Observable<PassModel[]>;
  // constructor
  constructor(public afs: AngularFirestore) {
    this.passDataCollection = this.afs.collection('pass');
    this.passData = this.passDataCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as PassModel[];
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
  getData() {
    return this.passData;
  }
  addItem(item: PassModel[]) {
    this.passDataCollection.add(item);
  }
  removeItem(item: PassModel[]) {
    // this.passDataDoc = this.afs.doc(`pass/${item.id}`);
    console.log(`${this.passData.id}`);
  }
}
