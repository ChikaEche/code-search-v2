import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  fileReader = new FileReader();

  constructor() { 
    this.fileReader.onload = (e) => {
      this.convertFileToText();
    }
  }

  fileUpload(file: File) {
    this.fileReader.readAsText(file)
  }

  convertFileToText() {
    console.log(this.fileReader.result?.toString().split(/\r\n|\n/))
  }
}
