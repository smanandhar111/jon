import {Component, OnInit} from '@angular/core';
import { ProditemService } from '../../services/proditem.service';
import {ProductInputModel, ProductTypes} from '../../models/allModel';
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
    price: null,
    imageUrl: '',
    imageUrlTwo: '',
    imageUrlThree: '',
    imageUrlFour: '',
    primeColor: ''
  };
  prodTypes: ProductTypes[] = [
    {value: 'earring', viewValue: 'Earring'},
    {value: 'necklace', viewValue: 'Necklace'},
    {value: 'bracelet', viewValue: 'Bracelet'},
    {value: 'clothing', viewValue: 'Clothing'},
  ];
  imgCount =  1;
  constructor(private prodItemService: ProditemService) { }

  ngOnInit() {}

  onSubmit(addProdForm: NgForm) {
      this.prodItemService.addItem(this.item);
      addProdForm.resetForm();
  }
  autoFill(): any {
    this.item.type = 'earring';
    this.item.imageUrl = 'star';
    this.item.title = 'Auto Generated Title';
    this.item.description = 'To generate random number between two numbers is so simple.';
    this.item.price = Math.floor(Math.random() * 1000) + 1;
    this.item.primeColor = 'Blue';
  }
  clearAll(addProdForm): any {
    addProdForm.resetForm();
  }
  clearInput(e): void {
    const inputName = e.target.previousElementSibling.name;
    if (inputName === 'title') {
      this.item.title = '';
    }
    if (inputName === 'description') {
      this.item.description = '';
    }
    if (inputName === 'price') {
      this.item.price = null;
    }
    if (inputName === 'imageUrl') {
      this.item.imageUrl = '';
    }
    if (inputName === 'imageUrlTwo') {
      this.item.imageUrlTwo = '';
    }
    if (inputName === 'imageUrlThree') {
      this.item.imageUrlThree = '';
    }
    if (inputName === 'imageUrlFour') {
      this.item.imageUrlFour = '';
    }
    if (inputName === 'primeColor') {
      this.item.primeColor = '';
    }
  }
  changeCount(val) {
    this.imgCount = val;
  }
}
