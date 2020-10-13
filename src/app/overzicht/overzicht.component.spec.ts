import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverzichtComponent } from './overzicht.component';

describe('OverzichtComponent', () => {
  let component: OverzichtComponent;
  let fixture: ComponentFixture<OverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
