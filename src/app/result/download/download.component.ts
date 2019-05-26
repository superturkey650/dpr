import { Component, OnInit, Input } from '@angular/core';
import { RARBGResult } from 'src/app/models/result.model';
import { Torrent } from 'src/app/models/torrent.model';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  @Input() torrents: RARBGResult[];
  @Input() active: Torrent[];
  // implement download event emitter

  constructor() { }

  ngOnInit() {
  }

  download(torrent: RARBGResult): void {
    // emit torrent download
  }
}
