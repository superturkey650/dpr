import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDownloadComponent } from './movie-download.component';

describe('MovieDownloadComponent', () => {
  let component: MovieDownloadComponent;
  let fixture: ComponentFixture<MovieDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
