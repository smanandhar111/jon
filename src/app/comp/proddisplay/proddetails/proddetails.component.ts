import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProditemService} from '../../../services/proditem.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddToFavsModel, ProductInputModel} from '../../../models/allModel';
import {UserInformation} from '../../abstracts/users';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../services/auth.service';
import _ from 'lodash';
import {UserService} from '../../../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-proddetails',
  templateUrl: './proddetails.component.html',
  styleUrls: ['./proddetails.component.scss']
})
export class ProddetailsComponent extends UserInformation implements OnInit, AfterViewInit {
  proditemData: ProductInputModel[];
  prodSpData: ProductInputModel;
  target;
  uid: string;
  imgCaro = 1;
  wishlisted: boolean;
  addedToCart: boolean;
  atcData: AddToFavsModel = {
    uid: '',
    userId: '',
    via: ''
  };
  userData: AddToFavsModel[];
  userData$: Observable<AddToFavsModel[]>;
  cartData$: Observable<AddToFavsModel[]>;
  wishData$: Observable<AddToFavsModel[]>;
  productId: string;
  resArr = [];
  public prodSpColor: string;
  public prodSpType: string;
  public selfId: string;
  constructor(private prodItemService: ProditemService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              db: AngularFireDatabase,
              afAuth: AngularFireAuth) {
    super(db, afAuth);
    this.atcData.userId = this.prodItemService.getUserId;
  }

  ngOnInit() {
    this.getProdItems();
    this.getParamId();
  }

  ngAfterViewInit(): void {
    this.getUserData();
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
          console.log(this.prodSpData);
          this.prodSpColor = this.prodSpData.primeColor;
          this.prodSpType = this.prodSpData.type;
          this.selfId = this.prodSpData.id;
          this.productId = result.id;
        }
      });
      let array = this.prodSpData.compProd.split(",");
      _.forEach(array, (d) => {
        _.forEach(this.proditemData, (e) => {
          if(d === e.id) {
            this.resArr.push(e);

          }
        })
      });

      let colorArray = this.prodSpData.primeColor.split(',');
      _.forEach(colorArray, (d) => {

      })
    });
  }

  getParamId() {
    this.target = this.route.params.subscribe(params => { // getting id from url param
      this.uid = params['id'];
    });
  }

  getUserData() {
      this.prodItemService.getUsers();
      this.prodItemService.cartData$.subscribe(data => {
        _.forEach(data, (res) => {
          if(this.productId == res.uid) {
            this.addedToCart = true;
          }
        })
      });

      this.prodItemService.wishData$.subscribe(data => {
        _.forEach(data, (res) => {
          if(this.productId == res.uid) {
            this.wishlisted = true;
          }
        })
      })
  }

  // toggle main image
  imgCaros(numb) {
    this.imgCaro = numb;
  }

  getWlClass() {
    return this.wishlisted ? 'fa-heart' : 'fa-heart-o';
  }

  getCartClass() {
    return this.addedToCart ? 'added-to-cart' : '';
  }

  buy(id: string) {
    this.router.navigate(['/bill-info', id]);
  }

  addToWishList(id:string) {
    this.atcData.uid = id;
    // this.atcData.userId = this.prodItemService.getUserId;
    this.atcData.via = 'wish';
    if (this.isUser()) {
      this.prodItemService.addToWish(this.atcData);
      this.wishlisted = true;
    } else {
      this.authService.login();
    }
  }

  addToCart(id:string) {
    this.atcData.uid = id;
    this.atcData.via = 'cart';
    if (this.isUser()) {
      this.prodItemService.addToCart(this.atcData);
      this.addedToCart = true;
    } else {
      this.authService.login();
    }
  }
}
