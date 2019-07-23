import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {AddToFavsModel} from '../../models/allModel';
import {Observable} from 'rxjs';

export abstract class UserInformation {
  items: Observable<any>;
  userId: string;
  cartRef: AngularFireList<any>;
  wishListRef:  AngularFireList<any>;
  wishSnap: Observable<any>;
  protected constructor(public db: AngularFireDatabase,
                        private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
  public isUser(): boolean {
    const authCondition = sessionStorage.getItem('auth');
    return authCondition === 'true';
  }
  //
  // addItemToCart(data) {
  //   this.cartRef = this.db.list(`users/${this.userId}/cart`);
  //   this.cartRef.push(data);
  // }
  //
  // addItemToWishList(data) {
  //   this.wishListRef = this.db.list(`users/${this.userId}/wishlist`);
  //   this.wishListRef.push(data);
  // }
  //
  // getWishList() {
  //   this.items = this.db.list(`users/${this.userId}/wishlist`).snapshotChanges();
  //   return this.items;
  // }
  //
  // getCart() {
  //   this.items = this.db.list(`users/${this.userId}/cart`).valueChanges();
  //   return this.items;
  // }
  // removeWishItem(itemKey: string) {
  //   this.wishListRef = this.db.list(`users/${this.userId}/wishlist`);
  //   this.wishListRef.remove(itemKey);
  // }
}
