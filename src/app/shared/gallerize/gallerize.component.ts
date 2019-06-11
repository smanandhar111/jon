import {Component, Input, OnInit} from '@angular/core';
import {ProductInputModel} from '../../models/allModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gallerize',
  templateUrl: './gallerize.component.html',
  styleUrls: ['./gallerize.component.scss']
})
export class GallerizeComponent implements OnInit {
  @Input() proditemData: ProductInputModel;
  @Input() filterType: string;
  @Input() filterPrice: string;
  @Input() filterColor: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  getProdDetails(id: number) {
    this.router.navigate(['/prod-details', id]);
  }
}
