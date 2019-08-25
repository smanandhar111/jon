import {PipeTransform, Pipe} from '@angular/core';
import { ProductInputModel} from '../../../models/allModel';

@Pipe({
  name: 'notSelf'
})
export class ProddisplayNotSelfPipe implements PipeTransform {
  transform(proditemData: ProductInputModel[], selfId: string) {

    if(!proditemData || !selfId) {
      return proditemData;
    } else {
      return proditemData.filter(prod => prod.id !== selfId);
    }
  }
}
