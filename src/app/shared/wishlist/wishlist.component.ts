import {Component, OnInit} from '@angular/core';
import {AddToFavsModel, ProductInputModel} from '../../models/allModel';
import {ProditemService} from '../../services/proditem.service';
import _ from 'lodash';
import {UserInformation} from '../../comp/abstracts/users';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent extends UserInformation implements OnInit {
  proditemData: ProductInputModel[];
  userWishList: AddToFavsModel[];
  wishData: AddToFavsModel[] = [];
  result = [];
  key: AddToFavsModel;
  constructor(private prodItemService: ProditemService,
              db: AngularFireDatabase,
              afAuth: AngularFireAuth,
              private router: Router) {
    super(db, afAuth);
  }

  ngOnInit() {
    this.getProdItems();
    this.getUserWishList();
  }

  getProdDetails(id: number) {
    this.router.navigate(['/prod-details', id]);
  }

  getProdItems() {
    // call to get item from server
    this.prodItemService.getItems();
    // after subscribing to item from server
    this.prodItemService.items.subscribe(data => {
      // set data to component
      this.proditemData = data;
    });
  }
  getUserWishList() {
    setTimeout(() => {
      this.prodItemService.getUsers();
      this.prodItemService.wishData$.subscribe(data => {
        this.wishData = data;
        _.forEach(data, (res) => {
          _.forEach(this.proditemData, (prodRes) => {
            if(res.uid === prodRes.id) {
              this.result.push(prodRes);
            }
          })
        })
      })
    }, 500);
  }
  notifyWishList(id: string) {
    _.forEach(this.wishData, (res) => {
      if(itemId === res.uid) {
        this.key = res.id;
      }
    });
    this.prodItemService.removeItem(this.key);
  }
}
