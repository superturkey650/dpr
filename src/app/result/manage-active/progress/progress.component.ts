import { Component, OnInit, Input } from '@angular/core';
import { Torrent } from 'src/app/models/torrent.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() torrent: Torrent;
  @Input() timer: number;

  constructor() { }

  ngOnInit() {
  }

  getCurrentPoint(): number {
    const progressBeforeResponse = (this.torrent.progress / 100) * this.torrent.size;
    const progressSinceResponse = this.torrent.dlspeed * this.timer;
    return (progressBeforeResponse + progressSinceResponse) / this.torrent.size;
  }
}
