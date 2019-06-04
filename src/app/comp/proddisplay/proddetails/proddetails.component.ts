import {Component, OnInit} from '@angular/core';
import {ProditemService} from '../../../services/proditem.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AddToFavsModel, ProductInputModel} from '../../../models/allModel';
import {UserInformation} from '../../abstracts/users';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../services/auth.service';
import _ from 'lodash';
@Component({
  selector: 'app-proddetails',
  templateUrl: './proddetails.component.html',
  styleUrls: ['./proddetails.component.scss']
})
export class ProddetailsComponent extends UserInformation implements OnInit {
  proditemData: ProductInputModel[];
  prodSpData: ProductInputModel;
  target;
  uid: string;
  imgCaro = 1;
  wishlisted: boolean;
  addedToCart: boolean;
  atcData = {
    uid: ''
  };
  userWishList: AddToFavsModel;
  userCartData: AddToFavsModel;
  userID: string;
  constructor(private prodItemService: ProditemService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              afs: AngularFirestore,
              db: AngularFireDatabase,
              afAuth: AngularFireAuth) {
    super(afs, db, afAuth);
  }

  ngOnInit() {
    this.getProdItems();
    this.getParamId();
    this.getUserWishList();
    this.getUserCart();
  }
  getProdItems() {
    // call to get item from server
    this.prodItemService.getItems();
    // after subscribing to item from server
    this.prodItemService.items.subscribe(data => {
      // set data to component
      this.proditemData = data;
      _.forEach(this.proditemData, (result) => {
        if (result.id === this.uid) {
          this.prodSpData = result;
        }
      });
    });
  }
  getParamId() {
    this.target = this.route.params.subscribe(params => { // getting id from url param
      this.uid = params['id'];
    });
  }
  getUserWishList() {
    setTimeout(() => {
      this.getWishList();
      this.items.subscribe(data => {
        this.userWishList = data;
        _.forEach(this.userWishList, (res) => {
          if (res.uid === this.uid) {
            this.wishlisted = true;
          }
        });
      });

    }, 1000);
  }
  getUserCart() {
    setTimeout(() => {
      this.getCart();
      this.items.subscribe(data => {
        this.userCartData = data;
        _.forEach(this.userCartData, (res) => {
          if (res.uid === this.uid) {
            this.addedToCart = true;
          }
        });
      });

    }, 1000);
  }

  // toggle main image
  imgCaros(numb) {
    this.imgCaro = numb;
  }
  // toggle atwlist
  getWlClass() {
    return this.wishlisted ? 'fa-heart' : 'fa-heart-o';
  }
  getCartClass() {
    return this.addedToCart ? 'added-to-cart' : '';
  }
  addToWishList(prodData: ProductInputModel) {
    this.atcData.uid = prodData.id;
    if (this.isUser()) {
      this.addItemToWishlist(this.atcData);
    } else {
      this.authService.login();
    }
  }
  buy(id: number) {
    this.router.navigate(['/bill-info', id]);
  }
  addToCart(prodData: ProductInputModel) {
    this.atcData.uid = prodData.id;
    if (this.isUser()) {
      this.addItemToCart(this.atcData);
    } else {
      this.authService.login();
    }
  }
}
