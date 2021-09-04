import { MilisearchFile } from "./milisearch-file";

export interface SearchedValues  {
  values: Array<Array<{lineNumber: number, text: string}>>
}

export interface SearchedValuesUI extends SearchedValues, MilisearchFile {}
