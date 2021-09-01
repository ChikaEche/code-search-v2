import { Injectable } from '@angular/core';
import { MeiliSearch } from 'meilisearch';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';
import { generateRandomString } from '../utils/generateRandomString';

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
}
