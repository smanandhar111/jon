import { Component, OnInit } from '@angular/core';
import {ProditemService} from '../../../services/proditem.service';
import { ActivatedRoute } from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-proddetails',
  templateUrl: './proddetails.component.html',
  styleUrls: ['./proddetails.component.css']
})
export class ProddetailsComponent implements OnInit {
  proditemData;
  prodSpData;
  target;
  uid: string;
  constructor(private prodItemService: ProditemService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.prodItemService.getItems();
    this.prodItemService.items.subscribe(data => {
      this.proditemData = data;
      this.proditemData.forEach(data => {
        if (data.id === this.uid) {
          this.prodSpData = data;
        }
      });
    });

    this.target = this.route.params.subscribe(params => {
      this.uid = params['id'];
    });
  }

}
