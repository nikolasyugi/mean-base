import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersUpdateComponent } from './banners-update.component';

describe('BannersUpdateComponent', () => {
  let component: BannersUpdateComponent;
  let fixture: ComponentFixture<BannersUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
