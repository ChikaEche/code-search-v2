import { Injectable } from '@angular/core';
import { MeiliSearch } from 'meilisearch';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';
import { generateRandomString } from '../utils/generateRandomString';
import { Project } from '../interfaces/project';
import { MilisearchFile } from '../interfaces/milisearch-file';

@Injectable({
  providedIn: 'root'
})
export class MeilisearchService {

  meilisearch = new MeiliSearch({
    host: environment.meiliSearch.host,
    apiKey: environment.meiliSearch.apiKey
  })

  constructor() { }

  createIndex() {
    return from(
      this.meilisearch.createIndex(`${generateRandomString()}${Date.now()}`)
    );
  }

  createFile(data: MilisearchFile, index: string) {
    console.log(data)
    return from(
      this.meilisearch.index(index).addDocuments([data])
    )
  }

  search(text: string, index: string) {
    console.log({text, index})
    return from(
      this.meilisearch.index(index).search(text)
    );
  }
}