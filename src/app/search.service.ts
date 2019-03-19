import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import {
  RARBGResponse,
  RARBGResult,
  RARBGToken
} from './models/result.model';

import {
  OMDBResponse,
  OMDBResult
} from './models/result.model';

interface Quality {
  format: string;
  resolution: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private omdbURL = 'http://www.omdbapi.com/?apikey=337b47b8&';
  public omdbResults$: BehaviorSubject<OMDBResult[]>;

  private rarbgURL = 'http://localhost:1337/torrentapi.org/pubapi_v2.php';
  public rarbgResults$: BehaviorSubject<RARBGResult[]>;

  private session = {
    token: '',
    timestamp: 0,
  };

  constructor(private http: HttpClient) {
    this._updateSession();
    this.omdbResults$ = new BehaviorSubject<OMDBResult[]>([]);
    this.rarbgResults$ = new BehaviorSubject<RARBGResult[]>([]);
  }

  private _buildOMDBURL(term: string): string {
    if (!term.trim()) { console.log('empty search'); }
    function clean(dirty: string) { return dirty.replace(/ /g, '+'); }
    return this.omdbURL.concat('s='.concat(clean(term)));
  }

  searchOMDB(term: string): void {
    const url: string = this._buildOMDBURL(term);
    this.http.get<OMDBResponse>(url).subscribe(res => this.omdbResults$.next(res.Search));
  }

  searchRARBG(id: string): void {
    this._updateSession();
    console.log('searching RARBG for ID', id);
    const params = new HttpParams()
      .set('mode', 'search')
      .set('search_imdb', id)
      .set('app_id', 'ttkms_ptbmatm')
      .set('token', this.session.token);
    this.http.get<RARBGResponse>(this.rarbgURL, { params }).subscribe(res => {
      console.log(res.torrent_results);
      const sorted = this.sort(res.torrent_results);
      this.rarbgResults$.next(sorted);
    });
  }

  private _updateSession(): void {
    if (!this._isValidToken()) {
      const params = new HttpParams()
        .set('get_token', 'get_token')
        .set('app_id', 'ttkms_ptbmatm');
      this.http.get<RARBGToken>(this.rarbgURL, { params })
      .subscribe(response => this.session.token = response.token);
    }
  }

  private _isValidToken(): boolean {
    return (Date.now() - this.session.timestamp) < 600;
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
      const hasResolution = qualities.some((q: Quality) => result.filename.toLowerCase().includes(q.resolution));
      const hasFormat = qualities.some((q: Quality) => result.filename.toLowerCase().includes(q.resolution));
      return hasFormat && hasResolution;
    });
  }
}