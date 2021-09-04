import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { MilisearchFile } from '../core/interfaces/milisearch-file';
import { Project } from '../core/interfaces/project';
import { SearchedValuesUI } from '../core/interfaces/searched-values';
import { MeilisearchService } from '../core/services/meilisearch.service';
import { getSearchedValues } from '../core/utils/getSearchedValues';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() currentProject: Project | null = null
  
  searchKeyWord = '';
  searchedValues: SearchedValuesUI[] = [];
  searching = false;
  constructor(
    private readonly milisearchService: MeilisearchService
  ) { }

  search() {
    this.searching = true;
    this.searchedValues = [];
    this.milisearchService.search(this.searchKeyWord, this.currentProject?.projectId as string).pipe(
      tap(({hits}) => {
        hits.map((result: MilisearchFile) => {
          const textArray = getSearchedValues(result.text.split(/\r\n|\n/), this.searchKeyWord)
          this.searchedValues = [
            ...this.searchedValues,
            {
              ...textArray,
              ...result
            }
          ]
          console.log(this.searchedValues)
        })
      }),
      catchError((err) => {
        console.error("Cannot searched values", {err})
        return of(err)
      }),
      finalize(() => {
        this.searchKeyWord = '';
        this.searching = false;
      })
    ).subscribe()
  }

}
