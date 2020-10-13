import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoekgebiedComponent } from './zoekgebied.component';

describe('ZoekgebiedComponent', () => {
  let component: ZoekgebiedComponent;
  let fixture: ComponentFixture<ZoekgebiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoekgebiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoekgebiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
