import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { RARBGResult } from './models/result.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RarbgService {
  private session = {
    token: null,
    timestamp: 0,
  };

  private tokenURL = 'https://ccc2iwzvt8.execute-api.us-east-2.amazonaws.com/dev/get-rarbg-token';
  private searchURL = 'https://ccc2iwzvt8.execute-api.us-east-2.amazonaws.com/dev/search-rarbg';
  public results$: BehaviorSubject<RARBGResult[]>;

  constructor(private http: HttpClient) {
    this.results$ = new BehaviorSubject<RARBGResult[]>([]);
  }

  search(imdbID: string): void {
    this.getToken().subscribe((token: string) => {
      const params = { imdbID, token };
      console.log(`searching RARBG: ${JSON.stringify(params)}`);
      this.http.post<any>(this.searchURL, params)
        .subscribe(resp => this.results$.next(resp.Payload ? JSON.parse(resp.Payload) : []));
    });
  }

  private getToken(): Observable<string> {
    if (!this.isValidToken(this.session.timestamp)) {
      return this.http.get<any>(this.tokenURL)
        .pipe(map(response => JSON.parse(response.Payload)));
    }
    return of(this.session.token);
  }

  private isValidToken(timestamp: number): boolean {
    return (Date.now() - timestamp) < 600;
  }
}
