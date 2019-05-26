import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../download.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { OMDBResult, RARBGResult, FullOMDBResult } from '../models/result.model';
import { map } from 'rxjs/operators';
import { Torrent } from '../models/torrent.model';
import { OmdbService } from '../omdb.service';
import { RarbgService } from '../rarbg.service';

const acceptableFormats = ['hevc', 'x264', 'h264', 'bdrip'];
const NOT_EPISODE = '1000000';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  imdbID: string;
  quality: string;

  omdbResult$: BehaviorSubject<OMDBResult>;
  rarbgResults$: BehaviorSubject<RARBGResult[]>;
  download$: BehaviorSubject<Torrent>;

  constructor(
    private omdb: OmdbService,
    private rarbg: RarbgService,
    private downloader: DownloadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.imdbID = this.route.snapshot.paramMap.get('imdbID');
    this.rarbg.search(this.imdbID);
    this.omdb.find(this.imdbID);
    this.downloader.getTorrents();
  }

  getResult$(): Observable<OMDBResult> {
    return this.omdb.result$;
  }

  getTorrents$(): Observable<RARBGResult[]> {
    return this.rarbg.results$;
  }

  isTV(result: FullOMDBResult): boolean {
    return result.Type === 'series';
  }

  isMovie(result: FullOMDBResult): boolean {
    return result.Type === 'movie';
  }

  hasTorrentQuality(quality: string): Observable<boolean> {
    return this.rarbg.results$.pipe(
      map((torrents: RARBGResult[]) => {
        return torrents.some((torrent: RARBGResult) => {
          const name = torrent.title.toLowerCase();
          return name.includes(quality) && acceptableFormats.some((f: string) => name.includes(f));
        });
      })
    );
  }

  getDownload(result: OMDBResult): Observable<Torrent> {
    const title = `${result.Title} (${result.Year})`;
    return this.downloader.active$.pipe(
      map((torrents: Torrent[]) => torrents.find((torrent: Torrent) => torrent.name.includes(title)))
    );
  }

  getProgress(torrent: Torrent): any {
    const speed = `${(torrent.dlspeed / 1000000).toFixed(2)} MB/s`;
    const etaHour = torrent.eta / 3600 > 1 ? `${Math.trunc(torrent.eta / 3600)} Hours` : '';
    const etaMin = torrent.eta % 60 > 1 ? `${Math.trunc(torrent.eta / 60)} Minutes` : '';
    const eta = `${etaHour} and ${etaMin}`;
    return {
      value: torrent.progress,
      speed,
      eta
    };
  }

  download(result: OMDBResult, torrent: RARBGResult): void {
    let title: string;
    if (torrent.episode_info) {
      if (torrent.episode_info.epnum === NOT_EPISODE) {
        const season = torrent.episode_info.seasonnum;
        const fseason = parseInt(season, 10) < 10 ? `S0${season}` : `S${season}`;
        title = `${result.Title} ${fseason}`;
      } else {
        const season = torrent.episode_info.seasonnum;
        const fseason = parseInt(season, 10) < 10 ? `S0${season}` : `S${season}`;
        const episode = torrent.episode_info.epnum;
        const fepisode = parseInt(episode, 10) < 10 ? `E0${episode}` : `E${episode}`;
        title = `${result.Title} ${fseason}${fepisode}`;
      }
    } else {
      console.log(`downloading ${title}`);
      title = `${result.Title} (${result.Year})`
    }
    this.downloader.download(torrent.download, title);
  }
}
