import {OnInit} from '@angular/core';
import {AddToFavsModel, ProductInputModel} from '../../models/allModel';
import {ProditemService} from '../../services/proditem.service';
import {Router} from '@angular/router';
import {UserInformation} from './users';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

export abstract class CartWish extends UserInformation implements OnInit {
  public constructor(private prodItemService: ProditemService,
                     db: AngularFireDatabase,
                     afAuth: AngularFireAuth,
                     private router: Router) {
    super(db, afAuth);
  }
  proditemData: ProductInputModel[];
  userWishList: AddToFavsModel;
  result = [];
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
      this.getWishList();
      this.items.subscribe(data => {
        this.userWishList = data;

        const wl = this.userWishList; const pd = this.proditemData;
        if (this.userWishList && this.proditemData) {
          for (let i = 0; i < wl.length; i++) {
            for (let j = 0; j < pd.length; j++) {
              if (wl[i].uid === this.proditemData[j].id) {
                this.result.push(this.proditemData[j]);
              }
            }
          }
        } else {
          alert('sums wrong');
        }
      });
    }, 1000);
  }
}
