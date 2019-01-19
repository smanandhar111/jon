import { Component, OnInit } from '@angular/core';
import {ProditemService} from '../../../services/proditem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proddetails',
  templateUrl: './proddetails.component.html',
  styleUrls: ['./proddetails.component.scss']
})
export class ProddetailsComponent implements OnInit {
  proditemData;
  prodSpData;
  target;
  uid: string;
  imgCaro = 1;
  constructor(private prodItemService: ProditemService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.prodItemService.getItems();
    this.prodItemService.items.subscribe(data => {
      this.proditemData = data;
      this.proditemData.forEach( result => {
        if (result.id === this.uid) {
          this.prodSpData = result;
        }
      });
    });

    this.target = this.route.params.subscribe(params => {
      this.uid = params['id'];
    });
  }
  imgCaros(numb) {
    this.imgCaro = numb;
  }
}
