import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardcoreComponent } from './hardcore.component';

describe('HardcoreComponent', () => {
  let component: HardcoreComponent;
  let fixture: ComponentFixture<HardcoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardcoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardcoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
