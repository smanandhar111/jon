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
    uid: null,
    primeColor: ''
  };
  prodTypes: ProductTypes[] = [
    {value: 'earring', viewValue: 'Earring'},
    {value: 'necklace', viewValue: 'Necklace'},
    {value: 'bracelet', viewValue: 'Bracelet'},
    {value: 'clothing', viewValue: 'Clothing'},
  ];
  imgCount =  1;
  lastCreatedUid: number;
  constructor(private prodItemService: ProditemService) { }

  ngOnInit() {}

  onSubmit(addProdForm: NgForm) {
      this.prodItemService.addItem(this.item);
      addProdForm.resetForm();
      debugger;
      // setting the last created Uid
      this.item.uid = this.lastCreatedUid;
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
    if (inputName === 'uid') {
      this.item.uid = null;
    }
  }
  changeCount(val) {
    this.imgCount = val;
  }
}
