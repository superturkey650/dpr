import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() term: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.term = this.term ? this.term : '';
  }


  search(term: string): void {
    if (!term || term === '') { return; }
    this.router.navigate(['/search'], { queryParams: { term } });
  }
}
