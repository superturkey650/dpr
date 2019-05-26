import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OMDBResult } from '../models/result.model';
import { OmdbService } from '../omdb.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  term: string;

  constructor(
    private route: ActivatedRoute,
    private omdb: OmdbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams
    .pipe(
      filter(params => params.term)
    ).subscribe((params: Params) => {
      this.term = params.term;
      this.searchOMDB(params.term);
    });
  }

  details(imdbID: string): void {
    console.log(`navigating to ${imdbID}`);
    this.router.navigate(['/result', imdbID]);
  }

  searchOMDB(term: string): void {
    console.log(term);
    this.omdb.search(term);
  }

  getResults$(): Observable<OMDBResult[]> {
    return this.omdb.searchResults$;
  }
}
