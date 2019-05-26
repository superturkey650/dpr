import { Component, OnInit, Input } from '@angular/core';
import { FullOMDBResult } from 'src/app/models/result.model';

@Component({
  selector: 'app-movie-result',
  templateUrl: './movie-result.component.html',
  styleUrls: ['./movie-result.component.scss']
})
export class MovieResultComponent implements OnInit {
  @Input() result: FullOMDBResult;
  
  constructor() { }

  ngOnInit() {
  }

}
