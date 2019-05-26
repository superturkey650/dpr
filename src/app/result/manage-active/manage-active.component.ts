import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Torrent, activeStates } from 'src/app/models/torrent.model';

@Component({
  selector: 'app-manage-active',
  templateUrl: './manage-active.component.html',
  styleUrls: ['./manage-active.component.scss']
})
export class ManageActiveComponent implements OnInit {
  @Input() torrent: Torrent;
  @Output() pauseEmitter: EventEmitter<string> = new EventEmitter();
  @Output() resumeEmitter: EventEmitter<string> = new EventEmitter();
  @Output() removeEmitter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  pause(): void {
    this.pauseEmitter.emit(this.torrent.hash);
  }

  resume(): void {
    this.resumeEmitter.emit(this.torrent.hash);
  }

  remove(): void {
    this.removeEmitter.emit(this.torrent.hash);
  }

  isPaused(): boolean {
    return this.torrent.state === 'pausedDL';
  }

  isActive(): boolean {
    return activeStates.some((state: string) => this.torrent.state === state);
  }
}
