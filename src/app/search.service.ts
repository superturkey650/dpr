import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { RARBGResult } from './models/result.model';

import {
  OMDBResponse,
  OMDBResult
} from './models/result.model';
import { map } from 'rxjs/operators';

interface Quality {
  format: string;
  resolution: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private rarbgTokenLambdaURL = 'https://ccc2iwzvt8.execute-api.us-east-2.amazonaws.com/dev/get-rarbg-token';
  private rarbgSearchLambdaURL = 'https://ccc2iwzvt8.execute-api.us-east-2.amazonaws.com/dev/search-rarbg';
  public rarbgResults$: BehaviorSubject<RARBGResult[]>;

  private omdbURL = 'http://www.omdbapi.com/?apikey=337b47b8&';
  public omdbResults$: BehaviorSubject<OMDBResult[]>;

  private session = {
    token: '',
    timestamp: 0,
  };

  constructor(private http: HttpClient) {
    this.omdbResults$ = new BehaviorSubject<OMDBResult[]>([]);
    this.rarbgResults$ = new BehaviorSubject<RARBGResult[]>([]);
  }

  private _buildOMDBURL(mode: string, term: string): string {
    function clean(dirty: string) { return dirty.replace(/ /g, '+'); }
    return this.omdbURL.concat(`${mode}=`.concat(clean(term)));
  }

  searchOMDB(term: string): void {
    const url: string = this._buildOMDBURL('s', term);
    this.http.get<OMDBResponse>(url).subscribe(res => this.omdbResults$.next(res.Search));
  }

  findOMDB(imdbID: string): void {
    const url: string = this._buildOMDBURL('i', imdbID);
    this.http.get<OMDBResult>(url).subscribe(res => this.omdbResults$.next([res]));
  }

  searchRARBG(imdbID: string): void {
    this.getToken().subscribe((token: string) => {
      const params = { imdbID, token };
      console.log(`searching RARBG: ${JSON.stringify(params)}`);
      this.http.post<any>(this.rarbgSearchLambdaURL, params)
        .subscribe(resp => this.rarbgResults$.next(resp.Payload ? JSON.parse(resp.Payload) : []));
    });
  }

  private getToken(): Observable<string> {
    if (!this.isValidToken(this.session.timestamp)) {
      return this.http.get<any>(this.rarbgTokenLambdaURL)
        .pipe(map(response => JSON.parse(response.Payload)));
    }
    return of(this.session.token);
  }

  private isValidToken(timestamp: number): boolean {
    return (Date.now() - timestamp) < 600;
  }

  private sort(results: RARBGResult[]): RARBGResult[] {
    const formats = ['hevc', 'x264', 'h264'];
    const resolutions = ['2160', '1080', '720', 'bdrip'];
    const qualities: Quality[] = [];
    formats.forEach((format: string) => {
      resolutions.forEach((resolution: string) => {
        qualities.push({ format, resolution });
      });
    });

    return results.filter((result: RARBGResult) => {
      const hasResolution = qualities.some((q: Quality) => result.title.toLowerCase().includes(q.resolution));
      const hasFormat = qualities.some((q: Quality) => result.title.toLowerCase().includes(q.format));
      return hasFormat && hasResolution;
    });
  }
}
