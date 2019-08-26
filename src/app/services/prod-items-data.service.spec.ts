import { TestBed, inject } from '@angular/core/testing';

import { ProdItemsDataService } from './prod-items-data.service';

describe('ProdItemsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProdItemsDataService]
    });
  });

  it('should be created', inject([ProdItemsDataService], (service: ProdItemsDataService) => {
    expect(service).toBeTruthy();
  }));
});
