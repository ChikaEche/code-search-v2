import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MilisearchFile } from '../core/interfaces/milisearch-file';
import { Project } from '../core/interfaces/project';
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
  searchedValues: MilisearchFile[] = [];
  constructor(
    private readonly milisearchService: MeilisearchService
  ) { }

  search() {
    this.searchedValues = [];
    this.milisearchService.search(this.searchKeyWord, this.currentProject?.projectId as string).pipe(
      tap(({ hits }) => {
        hits.map((result: MilisearchFile) => {
          const textArray = result.text.split(/\r\n|\n/);
          result.textArray = getSearchedValues(textArray, this.searchKeyWord);
          this.searchedValues = [
            ...this.searchedValues,
            result
          ];
        })
      })
    ).subscribe()
  }

}
