import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductInputModel} from '../../models/allModel';
import {ActivatedRoute, Router} from '@angular/router';
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
  public adminMode: boolean = false;
  cirHovered: boolean = false;
  constructor(private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    (this.router.url === '/add-product') ? this.adminMode = true : this.adminMode = false;
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

  // Copy of Clipboard
  copyId(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
