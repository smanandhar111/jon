import {PipeTransform, Pipe} from '@angular/core';
import { ProductInputModel} from '../../models/allModel';

@Pipe({
  name: 'prodPriceFilter'
})
export class ProddisplayPricefilterPipe implements PipeTransform {
  transform (proditemData: ProductInputModel[], filterPrice: string) {
    if (!proditemData || filterPrice) {
      return proditemData;
    }
  }
}
