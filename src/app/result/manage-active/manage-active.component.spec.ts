import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActiveComponent } from './manage-active.component';

describe('ManageActiveComponent', () => {
  let component: ManageActiveComponent;
  let fixture: ComponentFixture<ManageActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
