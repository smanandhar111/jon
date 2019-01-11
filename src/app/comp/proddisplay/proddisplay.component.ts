import { Component, OnInit } from '@angular/core';
import {ProductInputModel, ProductTypes} from '../../models/allModel';
import { ProditemService } from '../../services/proditem.service';

@Component({
  selector: 'app-proddisplay',
  templateUrl: './proddisplay.component.html',
  styleUrls: ['./proddisplay.component.scss']
})
export class ProddisplayComponent implements OnInit {
  proditemData: ProductInputModel[];
  filterType: string;
  filterPrice: string;
  prodTypes: ProductTypes[] = [
    {value: 'earring', viewValue: 'Earring'},
    {value: 'necklace', viewValue: 'Necklace'},
    {value: 'bracelet', viewValue: 'Bracelet'},
    {value: 'clothing', viewValue: 'Clothing'},
  ];
  prodPrices: ProductTypes[] = [
    {value: 'lessThan100', viewValue: 'Less Than Rs.100'},
    {value: 'MoreThan100', viewValue: 'More Than Rs.100'}
  ];
  constructor(private prodItemService: ProditemService) { }

  ngOnInit() {
    this.prodItemService.getItems().subscribe(data => {
      this.proditemData = data;
    });
  }

  clearFilterType() {
   this.filterType = '';
  }

}
