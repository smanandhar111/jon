import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerizeComponent } from './gallerize.component';

describe('GallerizeComponent', () => {
  let component: GallerizeComponent;
  let fixture: ComponentFixture<GallerizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
