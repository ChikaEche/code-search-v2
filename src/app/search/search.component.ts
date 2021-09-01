import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Project } from '../core/interfaces/project';
import { MeilisearchService } from '../core/services/meilisearch.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() currentProject: Project | null = null
  searchKeyWord = '';
  constructor(
    private readonly milisearchService: MeilisearchService
  ) { }

  search() {
    console.log(this.searchKeyWord, this.currentProject?.projectId as string)
    this.milisearchService.search(this.searchKeyWord, this.currentProject?.projectId as string).pipe(
      tap((value) => {
        console.log({value})
        //value.hits.map((data) => console.log({data}))
      })
    ).subscribe()
  }

}
