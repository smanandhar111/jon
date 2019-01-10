import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductInputModel} from '../models/allModel';

@Injectable({
  providedIn: 'root'
})
export class ProditemService {
  itemsCollection: AngularFirestoreCollection<ProductInputModel>;
  items: Observable<ProductInputModel[]>;
  constructor(public afs: AngularFirestore) {
    // this.items = this.afs.collection('items').valueChanges();
    this.itemsCollection = this.afs.collection('items');
    this.items = this.afs.collection('items').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ProductInputModel[];
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
  getItems() {
    return this.items;
  }
  addItem(item: ProductInputModel) {
    this.itemsCollection.add(item);
  }
}
