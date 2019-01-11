import {Component, OnInit} from '@angular/core';
import { ProditemService } from '../../services/proditem.service';
import {ProductInputModel, ProductTypes} from '../../models/allModel';
import {MatFormFieldControl} from '@angular/material';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss']
})
export class PassComponent implements OnInit {
  item: ProductInputModel = {
    type: '',
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
  constructor(private prodItemService: ProditemService) { }

  ngOnInit() {}

  onSubmit(addProdForm: NgForm) {
      this.prodItemService.addItem(this.item);
      addProdForm.resetForm();
  }

  clearInput(e) {
    const inputName = e.target.previousElementSibling.name;
    if (inputName === 'title') {
      this.item.title = '';
    }
    if (inputName === 'description') {
      this.item.description = '';
    }
    if (inputName === 'price') {
      this.item.price = '';
    }
    if (inputName === 'imageUrl') {
      this.item.imageUrl = '';
    }
  }

}
