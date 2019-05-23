import { Component, OnInit } from '@angular/core';
import {ProditemService} from '../../../services/proditem.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductInputModel} from '../../../models/allModel';
import * as _ from 'lodash';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-proddetails',
  templateUrl: './proddetails.component.html',
  styleUrls: ['./proddetails.component.scss']
})
export class ProddetailsComponent implements OnInit {
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
              private userService: UserService) { }

  ngOnInit() {
    // call to get item from server
    this.prodItemService.getItems();
    // after subscribing to item from server
    this.prodItemService.items.subscribe(data => {
      // set data to component
      this.proditemData = data;
      // looping thru data to get the prodSpData
      this.proditemData.forEach( result => {
        if (result.id === this.uid) {
          this.prodSpData = result;
          this.atcData.uid = this.prodSpData.id;
        }
      });
    });
    // getting id from url param
    this.target = this.route.params.subscribe(params => {
      this.uid = params['id'];
    });
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
    alert(`${prodData.title} has been added to your Wish list :)`);
    // Pass the product id to the users wish-list in the users object
    this.wishlisted = true;
  }
  buy(id: number) {
    this.router.navigate(['/bill-info', id]);
  }
  addToCart() {
    this.userService.addUser(this.atcData);
  }
}
