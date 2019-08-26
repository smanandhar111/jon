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
  userData$: Observable<AddToFavsModel[]>;
  cartData$: Observable<AddToFavsModel[]>;
  wishData$: Observable<AddToFavsModel[]>;
  userId: string;
  usersCollection: AngularFirestoreCollection<ProductInputModel>;

  result: ProductInputModel[];
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
    console.log('>>geting data');
    this.items = this.afs.collection('items').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ProductInputModel;
        data.id = a.payload.doc.id;
        this.prodItems = data;
        return data;
      });
    }));
    this.items.subscribe((data) => {
      this.result = data;
    })
  }
  addItem(item: ProductInputModel) {
    this.itemsCollection.add(item);
  }
  getUsers(){
    this.userData$ = this.afs.collection('userData',
        ref => ref.where("userId", "==", `${this.userId}`))
      .snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          return <AddToFavsModel>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data()
          };
        });
      }));
    this.cartData$ = this.userData$.pipe(
      map(results => results.filter(
        result => result.via.includes('cart'))));
    this.wishData$ = this.userData$.pipe(
      map(results => results.filter(
        result => result.via.includes('wish'))));
  }

  //todo: type needs to be AddToFavsModel
  addToCart(item: AddToFavsModel) {
    this.usersCollection.add(item);
  }
  //todo: type needs to be AddToFavsModel
  addToWish(item: AddToFavsModel) {
    this.usersCollection.add(item);
  }
  removeItem(item: AddToFavsModel) {
    this.usersCollection.doc(`${item}`).delete();
  }
}
