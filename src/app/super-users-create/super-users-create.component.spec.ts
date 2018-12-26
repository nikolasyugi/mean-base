import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUsersCreateComponent } from './super-users-create.component';

describe('SuperUsersCreateComponent', () => {
  let component: SuperUsersCreateComponent;
  let fixture: ComponentFixture<SuperUsersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperUsersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperUsersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
