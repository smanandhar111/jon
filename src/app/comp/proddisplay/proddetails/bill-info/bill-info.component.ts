import { Component, OnInit } from '@angular/core';
import {ProductInputModel, ProductTypes} from '../../../../models/allModel';
import {ProditemService} from '../../../../services/proditem.service';
import * as lo from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {ProddisplayComponent} from '../../proddisplay.component';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.scss']
})
export class BillInfoComponent implements OnInit {
  proditemData: ProductInputModel[];
  prodSpData: ProductInputModel;
  uid: string;
  target;
  pickODelivery: ProductTypes[] = [
    {value: 'pick-up', viewValue: 'Pick up'},
    {value: 'delivery', viewValue: 'Delivery'}
  ];
  bill = {
    pickODelivery: ''
  };
  constructor(private prodItemService: ProditemService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.prodItemService.getItems();
    // after subscribing to item from server
    this.prodItemService.items.subscribe(data => {
      // set data to component
      this.proditemData = data;
      // looping thru data to get the prodSpData
      this.target = this.route.params.subscribe(params => {
        this.uid = params['id'];
      });

      lo.forEach(this.proditemData, (res) => {
        if ( res.id === this.uid) {
          this.prodSpData = res;
        }
      });



    });
  }

}
