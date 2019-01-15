import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProductInputModel } from '../models/allModel';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  passDataCollection: AngularFirestoreCollection<ProductInputModel[]>;
  passDataDoc: AngularFirestoreDocument<ProductInputModel>;
  passData: Observable<ProductInputModel[]>;
  // constructor
  constructor(public afs: AngularFirestore) {
    this.passDataCollection = this.afs.collection('pass');
    this.passData = this.passDataCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ProductInputModel[];
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
  getData() {
    return this.passData;
  }
  addItem(item: ProductInputModel[]) {
    this.passDataCollection.add(item);
  }
  removeItem(item: ProductInputModel[]) {
  }
}
