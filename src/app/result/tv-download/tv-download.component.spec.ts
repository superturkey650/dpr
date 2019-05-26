import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvDownloadComponent } from './tv-download.component';

describe('TvDownloadComponent', () => {
  let component: TvDownloadComponent;
  let fixture: ComponentFixture<TvDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
