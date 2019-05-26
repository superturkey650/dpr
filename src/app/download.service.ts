import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Torrent } from './models/torrent.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private downloadLambdaURL = 'https://ccc2iwzvt8.execute-api.us-east-2.amazonaws.com/dev/download';
  private getTorrentsLambdaURL = 'https://ccc2iwzvt8.execute-api.us-east-2.amazonaws.com/dev/get-torrents';

  public active$: BehaviorSubject<Torrent[]>;

  constructor(private http: HttpClient) {
    this.active$ = new BehaviorSubject<Torrent[]>([]);
  }

  download(magnetLink: string, fileName: string): void {
    console.log(`magnet link: ${magnetLink}`);
    console.log(`fileName: ${fileName}`);
    const params = {
      magnetLink,
      fileName,
    };
    this.http.post<any>(this.downloadLambdaURL, params)
      .subscribe(resp => {
        console.log(resp);
        this.getTorrents();
      });
  }

  getTorrents(): void {
    this.http.get<any>(this.getTorrentsLambdaURL)
      .pipe(
        map(resp => resp.Payload)
      )
      .subscribe((resp: Torrent[]) => this.active$.next(resp));
  }

}
