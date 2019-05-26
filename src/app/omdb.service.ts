import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OMDBResult, FullOMDBResult, OMDBResponse } from './models/result.model';
import { HttpClient } from '@angular/common/http';

interface URLOptions {
  mode: string;
  term: string;
}

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private url = 'http://www.omdbapi.com/?apikey=337b47b8&';
  public searchResults$: BehaviorSubject<OMDBResult[]>;
  public result$: BehaviorSubject<FullOMDBResult>;

  constructor(private http: HttpClient) {
    this.result$ = new BehaviorSubject<FullOMDBResult>(null);
    this.searchResults$ = new BehaviorSubject<OMDBResult[]>([]);
  }

  private buildURL({mode, term}): string {
    const cleanedTerm = term.replace(/ /g, '+');
    return this.url.concat(`${mode}=${cleanedTerm}`);
  }

  search(term: string): void {
    const url: string = this.buildURL({mode: 's', term });
    this.http.get<OMDBResponse>(url).subscribe((res: OMDBResponse) => this.searchResults$.next(res.Search));
  }

  find(imdbID: string): void {
    const url: string = this.buildURL({mode: 'i', term: imdbID });
    this.http.get<FullOMDBResult>(url).subscribe((res: FullOMDBResult) => this.result$.next(res));
  }
}
