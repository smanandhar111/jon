import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() fromWishList: boolean;
  @Output() notify: EventEmitter<string> = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit() {
  }
  getProdDetails(id: number) {
    this.router.navigate(['/prod-details', id]);
  }
  removeItem(id: string) {
    this.notify.emit(id);
  }
  getDemClass(imgDem: string): string {
    if (imgDem === 'port') {
      return 'port';
    } if (imgDem === 'wide') {
      return 'wide';
    } if (imgDem === 'cube') {
      return 'cube';
    }
    return 'cube';
  }
}
