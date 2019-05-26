import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'result/:imdbID', component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
