import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Project } from '../core/interfaces/project';
import { FileUploadService } from '../core/services/file-upload.service';
import { fileTypes } from '../core/utils/fileTypes';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() currentProject: Project | null = null;
  uploadingFile = false;

  constructor(
    private readonly fileUploadService: FileUploadService
  ) { 
    this.fileUploadService.uploadingFile$.pipe(
      tap((uploading) => this.uploadingFile = uploading)
    ).subscribe()
  }

  uploadFile(event: any) {
    console.log({event})
    console.log(
      this.filterFiles(event.target.files)
    )
    //this.uploadingFile = true;
    // this.fileUploadService.fileUpload(
    //   event.target.files[0], this.currentProject?.projectId as string,
    //   event.target.files[0].name
    // ).pipe(
    //   tap((u) => {
    //     console.log(u?.updateId)
    //     this.uploadingFile = false
    //   }),
    //   catchError((err) => {
    //     this.uploadingFile = false;
    //     console.error("Error uploading file", {err});
    //     return of(null)
    //   })
    // ).subscribe()
  }

  filterFiles(files: FileList) {
    const filteredFiles: (File | null)[] = [];
    for(let i = 0; i < files.length; i++) {
      if(files.item(i)) {
        const file = files.item(i)?.name.split('.');
        const fileExtension = file ? file[file.length - 1] : '';
        if(fileTypes[fileExtension]) {
          filteredFiles.push(files.item(i))
        }
      }
    }
    return filteredFiles;
  }

}
