import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsDetailsComponent } from './faqs-details.component';

describe('FaqsDetailsComponent', () => {
  let component: FaqsDetailsComponent;
  let fixture: ComponentFixture<FaqsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
