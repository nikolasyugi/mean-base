import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPictureComponent } from './form-picture.component';

describe('FormPictureComponent', () => {
  let component: FormPictureComponent;
  let fixture: ComponentFixture<FormPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
