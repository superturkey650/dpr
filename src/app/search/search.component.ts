import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { OMDBResult, RARBGResult } from '../models/result.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  movieSelectionID: string;
  torrentSelection: RARBGResult[];

  constructor(private search: SearchService) {
    this.movieSelectionID = '';
    this.torrentSelection = [];
  }
  ngOnInit() { }

  log(movie: OMDBResult): void {
    console.log('starting torrent downloads');
    console.log(`new filename: ${movie.Title} (${movie.Year})`);
    console.log(this.torrentSelection.forEach(selection => console.log(`${selection.download}\n`)));
  }

  movieSearch(term: string): void {
    this.search.searchOMDB(term);
  }

  getMovies$(): Observable<OMDBResult[]> {
    return this.search.omdbResults$.asObservable();
  }

  torrentSearch(id: string): void {
    this.movieSelectionID = id;
    this.search.searchRARBG(id);
  }

  getTorrents$(): Observable<RARBGResult[]> {
    return this.search.rarbgResults$.asObservable();
  }
}
