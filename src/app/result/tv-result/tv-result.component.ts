import { Component, OnInit, Input } from '@angular/core';
import { FullOMDBResult } from 'src/app/models/result.model';

@Component({
  selector: 'app-tv-result',
  templateUrl: './tv-result.component.html',
  styleUrls: ['./tv-result.component.scss']
})
export class TvResultComponent implements OnInit {
  @Input() result: FullOMDBResult;

  constructor() { }

  ngOnInit() {
  }

}
