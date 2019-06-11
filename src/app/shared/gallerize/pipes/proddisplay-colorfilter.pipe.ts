import {PipeTransform, Pipe} from '@angular/core';
import {ProductInputModel} from '../../../models/allModel';

@Pipe({
  name: 'prodColorFilter'
})
export class ProddisplayColorfilterPipe implements PipeTransform {
  transform(proditemData: ProductInputModel[], filterColor: string) {
    if (!proditemData || !filterColor) {
      return proditemData;
    } else {
      return proditemData.filter(prod => prod.primeColor.toLowerCase().indexOf(filterColor.toLowerCase()) !== -1);
    }
  }
}
