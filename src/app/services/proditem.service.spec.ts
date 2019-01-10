import { TestBed, inject } from '@angular/core/testing';

import { ProditemService } from './proditem.service';

describe('ProditemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProditemService]
    });
  });

  it('should be created', inject([ProditemService], (service: ProditemService) => {
    expect(service).toBeTruthy();
  }));
});
