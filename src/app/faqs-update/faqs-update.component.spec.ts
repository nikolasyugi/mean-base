import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsUpdateComponent } from './faqs-update.component';

describe('FaqsUpdateComponent', () => {
  let component: FaqsUpdateComponent;
  let fixture: ComponentFixture<FaqsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
