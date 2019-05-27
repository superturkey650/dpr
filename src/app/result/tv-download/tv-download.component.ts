import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RARBGResult } from 'src/app/models/result.model';
import { Torrent } from 'src/app/models/torrent.model';

const NOT_EPISODE = '1000000';

@Component({
  selector: 'app-tv-download',
  templateUrl: './tv-download.component.html',
  styleUrls: ['./tv-download.component.scss']
})
export class TvDownloadComponent implements OnInit {
  @Input() rarbgResults: RARBGResult[];
  @Input() torrents: Torrent[];
  @Output() downloader: EventEmitter<RARBGResult>;

  constructor() { }

  ngOnInit() {
    this.downloader = new EventEmitter<RARBGResult>();
  }

  hasSeason(season: number): boolean {
    return this.rarbgResults.some((result: RARBGResult) => parseInt(result.episode_info.seasonnum, 10) === season);
  }
  hasEpisode(season: number, episode: number): boolean {
    return this.rarbgResults.some((result: RARBGResult) => {
      return parseInt(result.episode_info.seasonnum, 10) === season && parseInt(result.episode_info.epnum, 10) === episode;
    });
  }

  getSeasonsTorrents(): RARBGResult[] {
    return this.rarbgResults.filter((result: RARBGResult) => result.episode_info.epnum === NOT_EPISODE);
  }

  getSeasonTorrent(season: number): RARBGResult {
    return this.rarbgResults.filter((result: RARBGResult) => {
      return result.episode_info.epnum === NOT_EPISODE && parseInt(result.episode_info.seasonnum, 10) === season;
    })[0];
  }

  getEpisodeTorrents(season: number): RARBGResult[] {
    return this.rarbgResults.filter((result: RARBGResult) => {
        return result.episode_info.seasonnum === `${season}` && result.episode_info.epnum !== NOT_EPISODE;
      });
  }

  getMaxEpisode(season: number): number {
    const episodeNums = this.rarbgResults.filter((result: RARBGResult) => {
      return result.episode_info.epnum !== NOT_EPISODE
        && parseInt(result.episode_info.seasonnum, 10) === season;
    }).map((result: RARBGResult) => parseInt(result.episode_info.epnum, 10));
    return Math.max(...episodeNums);
  }

  getActiveSeason(season: number): Torrent {
    const fseason: string = season > 10 ? `0${season}` : `${season}`;
    return this.torrents.find((torrent: Torrent) => {
      const hasToken = torrent.name.includes(fseason);
      const isEpisode = this.range(this.getMaxEpisode(season)).some((episode: number) => this.getActiveEpisode(season, episode) !== null);
      return hasToken && !isEpisode;
    });
  }

  getActiveEpisode(season: number, episode: number): Torrent {
    const fseason: string = season > 10 ? `0${season}` : `${season}`;
    const fepisode: string = episode < 10 ? `0${episode}` : `${episode}`;
    return this.torrents.find((torrent: Torrent) => torrent.name.includes(`${fseason}${fepisode}`));
  }

  range(max: number): number[] {
    return Array(max).fill(undefined).map((_, index) => index + 1); // add one because of 0-indexing
  }

  download(rarbgResult: RARBGResult): void {
    this.downloader.emit(rarbgResult);
  }
}
