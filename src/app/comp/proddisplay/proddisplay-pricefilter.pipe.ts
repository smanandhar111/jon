import {PipeTransform, Pipe} from '@angular/core';
import { ProductInputModel} from '../../models/allModel';

@Pipe({
  name: 'prodPriceFilter'
})
export class ProddisplayPricefilterPipe implements PipeTransform {
  transform (proditemData: ProductInputModel[], filterPrice: string) {
    if (!proditemData || !filterPrice) {
      return proditemData;
    } else {
      return proditemData.filter(function (x) {
        switch (filterPrice) {
          case 'lessThan100':
            return x.price <= 100;
          case '100-500':
            return x.price > 100 && x.price <= 500;
          case '500-1000':
            return x.price > 500 && x.price <= 1000;
          case 'MoreThan1000':
            return x.price >= 1000;
        }
      });
    }
  }
}
