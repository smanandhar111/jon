import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AddToFavsModel, ProductInputModel} from '../models/allModel';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProditemService {
  itemsCollection: AngularFirestoreCollection<ProductInputModel>;
  items: Observable<ProductInputModel[]>;
  prodItems;

  userId: string;
  usersCollection: AngularFirestoreCollection<ProductInputModel>;

  constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.itemsCollection = this.afs.collection('items');
    this.usersCollection = this.afs.collection('userData');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
  get getUserId(): string {
    return this.userId;
  }
  getItems() {
    this.items = this.afs.collection('items').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ProductInputModel;
        data.id = a.payload.doc.id;
        this.prodItems = data;
        return data;
      });
    }));
  }
  addItem(item: ProductInputModel) {
    this.itemsCollection.add(item);
  }
  getUsers(): Observable<AddToFavsModel[]> {
    //Todo: this.userId is undefined when calling this fun wihtout timeout
    // Fix using no Timeout
    return this.afs.collection('userData',
        ref => ref.where("userId", "==", `${this.userId}`))
      .snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          return <AddToFavsModel>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data()
          };
        });
      }))
  }

  //todo: type needs to be AddToFavsModel
  addToCart(item: AddToFavsModel) {
    this.usersCollection.add(item);
  }
  //todo: type needs to be AddToFavsModel
  addToWish(item: AddToFavsModel) {
    this.usersCollection.add(item);
  }
}
