import {PipeTransform, Pipe} from '@angular/core';
import { ProductInputModel} from '../../../models/allModel';

@Pipe({
  name: 'prodPriceFilter'
})
export class ProddisplayPricefilterPipe implements PipeTransform {
  transform (proditemData: ProductInputModel[], filterPrice: string) {
    if (!proditemData || !filterPrice) {
      return proditemData;
    } else {
      return proditemData.filter(function (prod) {
        switch (filterPrice) {
          case 'lessThan100':
            return prod.price <= 100;
          case '100-500':
            return prod.price > 100 && prod.price <= 500;
          case '500-1000':
            return prod.price > 500 && prod.price <= 1000;
          case 'MoreThan1000':
            return prod.price >= 1000;
        }
      });
    }
  }
}
