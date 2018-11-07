import { Component, OnInit } from '@angular/core';
import { PassDataService} from '../../services/pass-data.service';
import {PassModel} from '../../models/passModel';
import {MatFormFieldControl} from '@angular/material';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss']
})
export class PassComponent implements OnInit {
  passData: PassModel[];
  panelOpenState = false;
  constructor(private passDbService: PassDataService) { }

  ngOnInit() {
    this.passDbService.getData().subscribe(data => {
      this.passData = data;
    });
  }

}
