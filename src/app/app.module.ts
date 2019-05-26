import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ResultComponent } from './result/result.component';
import { TvResultComponent } from './result/tv-result/tv-result.component';
import { MovieResultComponent } from './result/movie-result/movie-result.component';
import { DownloadComponent } from './result/download/download.component';
import { TvDownloadComponent } from './result/tv-download/tv-download.component';
import { MovieDownloadComponent } from './result/movie-download/movie-download.component';
import { ManageActiveComponent } from './result/manage-active/manage-active.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    ResultComponent,
    TvResultComponent,
    MovieResultComponent,
    DownloadComponent,
    TvDownloadComponent,
    MovieDownloadComponent,
    ManageActiveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
