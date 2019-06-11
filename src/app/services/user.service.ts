import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';

export interface Item {
  uid: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection;
  items: Observable<Item>; // list of objects
  userId: string;
  constructor(public afs: AngularFirestore,
              public db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.usersCollection = this.afs.collection('users');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
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
      this.items = this.db.list(`users/${this.userId}`);
      this.items.push(data);
    } else {
    }
  }

  getItemsList() {
    const relative = this.db.object(`users/${this.userId}`).valueChanges();
    relative.subscribe(data => {
      this.items = data;
      console.log('user', this.items);
    });
  }
}
