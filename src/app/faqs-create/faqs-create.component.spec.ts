import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsCreateComponent } from './faqs-create.component';

describe('FaqsCreateComponent', () => {
  let component: FaqsCreateComponent;
  let fixture: ComponentFixture<FaqsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
