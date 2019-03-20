import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersCreateComponent } from './banners-create.component';

describe('BannersCreateComponent', () => {
  let component: BannersCreateComponent;
  let fixture: ComponentFixture<BannersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
