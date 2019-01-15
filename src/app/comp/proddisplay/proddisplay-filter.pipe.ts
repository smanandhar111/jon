import {PipeTransform, Pipe} from '@angular/core';
import { ProductInputModel} from '../../models/allModel';

@Pipe({
  name: 'prodFilter'
})
export class ProddisplayFilterPipe implements PipeTransform {
  transform(proditemData: ProductInputModel[], filterType: string) {
    if (!proditemData || !filterType) {
      return proditemData;
    } else {
      return proditemData.filter(prod =>
        // Todo: prod is returning null
        prod.type.toLowerCase().indexOf(filterType.toLowerCase()) !== -1);
    }
  }
}
