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
    return this.loadFile(file).pipe(
      map((text) => text as string),
      switchMap((text) => this.saveFileText(projectId, fileName, text)),
      catchError((err) => {
        console.error("An error occured while uploading file", {err})
        return of(null)
      })
    )
  }

  loadFile(file: File) {
    this.fileReader.readAsText(file);
    return from(new Promise((resolve, reject) => {
      this.fileReader.onerror = function(){
        reject(new Error("Could not load file"))
      }

      this.fileReader.onload = function() {
        //this.saveFileText(projectId, fileName)
        resolve(this.result as string)
      }
    }))
  }

  saveFileText(projectId: string, fileName: string, text: string) {
    const fileText = this.convertFileToText();
    const fileId = `${generateRandomString()}${Date.now()}`;

    const ref = doc(this.firestore, `projects/${projectId}`)

    return from(setDoc(ref, {
        files: {
          [fileId]: {
            text,
            name: fileName
          }
        }
      },
      {merge: true}
    )).pipe(
      switchMap(() => {
        console.log({fileText, fileId, fileName})
        return this.milisearchService.createFile({
          text,
          id: fileId,
          name: fileName,
        }, projectId)
      })
    )
  }

  convertFileToText() {
    return this.fileReader.result?.toString()
  }
}
