import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductInputModel} from '../../models/allModel';
import {Router} from '@angular/router';
import {st} from '@angular/core/src/render3';

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
  cirHovered: boolean = false;
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
  addToWishList() {
    alert('some');
  }
  circleMEnter():void {
    this.proditemData.hovered = true;

  }
  circleMOut():void {
    this.proditemData.hovered = false;
  }
  getActive() {
    if(this.proditemData.hovered === true) {
      return 'active'
    } else {
      return 'not';
    }
  }
  heartHovered() {
    this.proditemData.heartHovered = true;
  }
  heartHoveredNot() {
    this.proditemData.heartHovered = false;
  }
  getHeartActive() {
    if(this.proditemData.heartHovered === true) {
      return 'hover'
    } else {
      return 'not';
    }
  }
}
