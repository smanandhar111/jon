import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import {ProditemService} from '../../services/proditem.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {UserInformation} from '../../comp/abstracts/users';
import {AddToFavsModel, ProductInputModel} from '../../models/allModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends UserInformation implements OnInit {
  proditemData: ProductInputModel[];
  cartData: AddToFavsModel[];
  result = [];
  key: AddToFavsModel;
  constructor(db: AngularFireDatabase,
              afAuth: AngularFireAuth,
              private prodItemService: ProditemService,
              private router: Router) {
    super(db, afAuth);
  }

  ngOnInit() {
    this.getProdItems();
    this.getCartItems();
  }

  getProdDetails(id: number) {
    this.router.navigate(['/prod-details', id]);
  }

  getProdItems() {
    this.prodItemService.getItems();
    this.prodItemService.items.subscribe(data => {
      this.proditemData = data;
    });
  }

  getCartItems() {
    setTimeout(() => {
      this.prodItemService.getUsers();
      this.prodItemService.cartData$.subscribe(data => {
        this.cartData = data;
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
  removeCartItem(itemId: AddToFavsModel) {
    _.forEach(this.cartData, (res) => {
      if(itemId === res.uid) {
         this.key = res.id;
      }
    });
    this.prodItemService.removeItem(this.key);
  }
}
