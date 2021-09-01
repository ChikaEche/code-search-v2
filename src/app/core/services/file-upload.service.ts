import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

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
      this.convertFileToText();
    }
    this.fileReader.readAsText(file)
  }

  saveFileText(projectId: string, fileName: string) {
    const fileText = {}
  }

  convertFileToText() {
    console.log(this.fileReader.result?.toString().split(/\r\n|\n/))
  }
}
