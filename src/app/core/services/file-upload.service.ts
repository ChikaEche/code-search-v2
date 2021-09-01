import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { generateRandomString } from '../utils/generateRandomString';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  fileReader = new FileReader();

  constructor(
    private readonly firestore: Firestore
  ) {}

  fileUpload(file: File, projectId: string, fileName: string) {
    console.log({projectId, fileName})
    this.fileReader.onload = (e) => {
      this.saveFileText(projectId, fileName)
    }
    this.fileReader.readAsText(file)
  }

  saveFileText(projectId: string, fileName: string) {
    const fileText = this.convertFileToText();
    const fileId = `${generateRandomString()}${Date.now()}`;

    const ref = doc(this.firestore, `projects/${projectId}`)

    from(updateDoc(ref, 'files', {
        [fileId]: {
          name: fileName,
          text: fileText
        }
      }
    )).pipe(
      map(() => console.log("uploaded"))
    ).subscribe()

  }

  convertFileToText() {
    return this.fileReader.result?.toString().split(/\r\n|\n/)
  }
}
