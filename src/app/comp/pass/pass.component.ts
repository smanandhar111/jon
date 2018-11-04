import { Component, OnInit } from '@angular/core';
import { PassDataService} from '../../services/pass-data.service';
import {PassModel} from '../../models/passModel';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class PassComponent implements OnInit {
  passData: PassModel[];
  constructor(private passDbService: PassDataService) { }

  ngOnInit() {
    this.passDbService.getData().subscribe(data => {
      console.log('>>>', data);
    });
  }

}
