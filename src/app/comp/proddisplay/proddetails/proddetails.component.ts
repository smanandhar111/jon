import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProditemService} from '../../../services/proditem.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductInputModel} from '../../../models/allModel';
import {UserInformation} from '../../abstracts/users';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../services/auth.service';

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
  atcData = {
    uid: ''
  };
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
    // call to get item from server
    this.prodItemService.getItems();
    // after subscribing to item from server
    this.prodItemService.items.subscribe(data => {
      // set data to component
      this.proditemData = data;
      _.forEach(this.proditemData, (result) => {
        console.log('res', result);
        if (result.id === this.uid) {
              this.prodSpData = result;
            }
      });
    });

    this.target = this.route.params.subscribe(params => { // getting id from url param
      this.uid = params['id'];
    });

    setTimeout(() => {
      this.getItemsList();
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
  addToWishList(prodData: ProductInputModel) {
    if (this.isUser()) {
      this.addItemToWishlist(this.atcData);
      this.wishlisted = true;
    } else {
      this.authService.login();
    }
  }
  buy(id: number) {
    this.router.navigate(['/bill-info', id]);
  }
  addToCart() {
    if (this.isUser()) {
      this.addItemToCart(this.atcData);
    } else {
      this.authService.login();
    }
  }
}
