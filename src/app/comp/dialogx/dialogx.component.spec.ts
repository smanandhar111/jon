import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogxComponent } from './dialogx.component';

describe('DialogxComponent', () => {
  let component: DialogxComponent;
  let fixture: ComponentFixture<DialogxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
