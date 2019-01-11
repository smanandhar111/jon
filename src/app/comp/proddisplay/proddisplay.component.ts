import { Component, OnInit } from '@angular/core';
import { ProductInputModel} from '../../models/allModel';
import { ProditemService } from '../../services/proditem.service';

@Component({
  selector: 'app-proddisplay',
  templateUrl: './proddisplay.component.html',
  styleUrls: ['./proddisplay.component.scss']
})
export class ProddisplayComponent implements OnInit {
  proditemData: ProductInputModel[];

  constructor(private prodItemService: ProditemService) { }

  ngOnInit() {
    this.prodItemService.getItems().subscribe(data => {
      this.proditemData = data;
    });
  }

}
