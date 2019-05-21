import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection;

  constructor(public afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');
  }

  addUser(data): void {
    this.usersCollection.add(data);
  }
}
