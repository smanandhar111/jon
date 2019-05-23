import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

export class Item {
  body: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection;
  items: FirebaseListObservable<Item[]> = null; // list of objects
  userId: string;
  constructor(public afs: AngularFirestore,
              public db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.usersCollection = this.afs.collection('users');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        console.log('uid', this.userId);
      }
    });
  }

  // getItemsList(): FirebaseListObservable<Item[]> {
  //   if (!this.userId) {
  //     return null;
  //   } else {
  //     this.items = this.db.list(`users/${this.userId}`);
  //     console.log('items', this.items);
  //     return this.items;
  //   }
  // }
  isUser() {
    const authCondition = sessionStorage.getItem('auth');
    if (authCondition === 'true') {
      return true;
    } else {
      return false;
    }
  }

  addUser(data) {
    if (this.isUser()) {
      console.log('>>>', data);
      this.items = this.db.list(`users/${this.userId}`);
      this.items.push(data);
    } else {
    }
  }
}
