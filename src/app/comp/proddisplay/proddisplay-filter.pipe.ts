import {PipeTransform, Pipe} from '@angular/core';
import { ProductInputModel} from '../../models/allModel';

@Pipe({
  name: 'prodFilter'
})
export class ProddisplayFilterPipe implements PipeTransform {
  transform (proditemData: ProductInputModel[], searchTerm: string) {
    if (!proditemData || !searchTerm) {
      return proditemData;
    } else {
      return proditemData.filter(prod =>
        prod.type.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
  }
}
