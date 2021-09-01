import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { generateRandomString } from '../utils/generateRandomString';
import { MeilisearchService } from './meilisearch.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  fileReader = new FileReader();
  uploadingFile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly firestore: Firestore,
    private readonly milisearchService: MeilisearchService
  ) {}


  fileUpload(file: File, projectId: string, fileName: string) {
    this.uploadingFile$.next(true)
    this.fileReader.readAsText(file);
    this.fileReader.onload = () => {
      this.saveFileText(projectId, fileName)
    }
  }

  saveFileText(projectId: string, fileName: string) {
    const fileText = this.convertFileToText();
    const fileId = `${generateRandomString()}${Date.now()}`;

    const ref = doc(this.firestore, `projects/${projectId}`)

    from(setDoc(ref, {
        files: {
          [fileId]: {
            name: fileName,
            text: fileText
          }
        }
      },
      {merge: true}
    )).pipe(
      switchMap(() => {
        return this.milisearchService.createFile({
          id: fileId,
          name: fileName,
          text: fileText as string[]
        }, fileId)
      }),
      tap(() => {
        this.uploadingFile$.next(false)
        console.log('uploaded file complete')
      }),
      catchError((err) => {
        this.uploadingFile$.next(false)
        console.error("An error occured while uploading file", {err})
        return of(null)
      })
    ).subscribe()
  }

  convertFileToText() {
    return this.fileReader.result?.toString().split(/\r\n|\n/)
  }
}
