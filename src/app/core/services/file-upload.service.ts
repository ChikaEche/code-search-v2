import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, forkJoin, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FileWithRelativePath } from '../interfaces/file-with-relative-path';
import { convertToCharCode } from '../utils/convert-to-charccode';
import { MeilisearchService } from './meilisearch.service';

type LoadFileJob = {
  [key:string]: Observable<unknown>
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  uploadingFile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly firestore: Firestore,
    private readonly milisearchService: MeilisearchService
  ) {}

  fileUpload(files: File[], projectId: string) {

    const jobs = files.reduce((previousValue, currentValue) => {
      const filePath  = (currentValue as FileWithRelativePath).webkitRelativePath;
      previousValue[filePath] = this.loadFile(currentValue)
      return previousValue
    }, {} as LoadFileJob)

    return forkJoin(jobs)
      .pipe(
        switchMap((fileMap) => {
          return this.saveFileMap(projectId, fileMap)
        })
      )

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
        return this.milisearchService.createFiles(
          Object.keys(files).map((key) => ({
          id: convertToCharCode(key),
          name: key,
          text: files[key]
        })  ), projectId)
      })
    )
  }
}
