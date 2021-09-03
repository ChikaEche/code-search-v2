import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, forkJoin, from, Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { generateRandomString } from '../utils/generateRandomString';
import { MeilisearchService } from './meilisearch.service';

type LoadFileJob = {
  [key:string]: Observable<unknown>
}

interface FileWithRelativePath extends File {
  webkitRelativePath:  string
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  //fileReader = new FileReader();
  uploadingFile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly firestore: Firestore,
    private readonly milisearchService: MeilisearchService
  ) {}

  // iterateFiles(file: File[]) {
  //   of(...file).pipe(
  //     map((file: File) => {
  //       return this.fileUpload(file, '', '')
  //     })
  //   ).subscribe()
  // }


  fileUpload(files: File[], projectId: string) {
    console.log(files)

    const jobs = files.reduce((previousValue, currentValue) => {
      const filePath  = (currentValue as FileWithRelativePath).webkitRelativePath
      previousValue[filePath] = this.loadFile(currentValue)
      return previousValue
    }, {} as LoadFileJob)

    return forkJoin(jobs)
      .pipe(
        switchMap((fileMap) => {
          return this.saveFileMap(projectId, fileMap)
        })
      )

    // return of(...files).pipe(
    //   concatMap((file: File) => {
    //     return this.loadFile(file)
    //   }),
    //   concatMap((text) => {
    //     return this.saveFileText(projectId, text, )
    //   })
    // ).subscribe()

  }

  loadFile(file: File) {
    const fileReader = new FileReader()
    fileReader.readAsText(file);
    return from(new Promise((resolve, reject) => {
      fileReader.onerror = function(){
        reject(new Error("Could not load file"))
      }

      fileReader.onload = function() {
        resolve(this.result as string)
      }
    }))
  }

  saveFileMap(projectId: string, files: {[path: string]: string}) {
    const ref = doc(this.firestore, `projects/${projectId}`)
    return from(setDoc(ref, {
        files
      },
      {merge: true}
    )).pipe(
      switchMap(() => {
        return this.milisearchService.createFiles(Object.keys(files).map((key) => ({
          id: key,
          text: files[key]
        })), projectId)
      })
    )
  }

  convertFileToText() {
    return 'this.fileReader.result?.toString()'
  }
}
