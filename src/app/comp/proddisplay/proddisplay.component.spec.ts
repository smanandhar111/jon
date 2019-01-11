import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProddisplayComponent } from './proddisplay.component';

describe('ProddisplayComponent', () => {
  let component: ProddisplayComponent;
  let fixture: ComponentFixture<ProddisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProddisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProddisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
