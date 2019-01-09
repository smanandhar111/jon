import { Component, OnInit } from '@angular/core';
import { PassDataService} from '../../services/pass-data.service';
import {ProductInputModel, ProductTypes} from '../../models/allModel';
import {MatFormFieldControl} from '@angular/material';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss']
})
export class PassComponent implements OnInit {
  passData: ProductInputModel[];
  panelOpenState = false;
  item: ProductInputModel = {
    title: '',
    description: '',
    price: '',
    imageUrl: ''
  };
  prodTypes: ProductTypes[] = [
    {value: 'earring', viewValue: 'Earring'},
    {value: 'necklace', viewValue: 'Necklace'},
    {value: 'bracelet', viewValue: 'Bracelet'},
    {value: 'clothing', viewValue: 'Clothing'},
  ];
  constructor(private passDbService: PassDataService) { }

  ngOnInit() {
    this.passDbService.getData().subscribe(data => {
      this.passData = data;
    });
  }

  onSubmit(event, item) {
    if (this.item.title !== '' && this.item.description !== '') {
      this.passDbService.addItem(this.item);
      this.item.title = '';
      this.item.description = '';
      this.item.price = '';
      this.item.imageUrl = '';
    }
  }

  removeCred(event, item) {
    this.passDbService.removeItem(item);
  }

  clearInput(input) {
  }

}
