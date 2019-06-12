import { Component, OnInit } from '@angular/core';
import {CartWish} from '../../comp/abstracts/cartWish';
import {ProditemService} from '../../services/proditem.service';
import {AngularFirestore} from '@angular/fire/firestore';
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
  addedToCart: AddToFavsModel;
  result = [];
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
    // call to get item from server
    this.prodItemService.getItems();
    // after subscribing to item from server
    this.prodItemService.items.subscribe(data => {
      // set data to component
      this.proditemData = data;
    });
  }

  getCartItems() {
    setTimeout(() => {
      this.getCart();
      this.items.subscribe(data => {
        this.addedToCart = data;

        const atc = this.addedToCart; const pd = this.proditemData;
        if (pd && atc) {
          for (let i = 0; i < atc.length; i++) {
            for (let j = 0; j < pd.length; j++) {
              if (atc[i].uid === this.proditemData[j].id) {
                this.result.push(this.proditemData[j]);
              }
            }
          }
        } else {
          alert('sums wrong @ cart.component get CartItems');
        }
      });
    }, 1000);
  }

}
