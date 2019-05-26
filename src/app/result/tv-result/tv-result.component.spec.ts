import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvResultComponent } from './tv-result.component';

describe('TvResultComponent', () => {
  let component: TvResultComponent;
  let fixture: ComponentFixture<TvResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
