import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
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
  ) {}

  uploadFile(event: any) {
    this.uploadingFile = true;
    const files = this.filterFiles(event.target.files) as File[]

    this.fileUploadService.fileUpload(files, this.currentProject?.projectId as string).pipe(
      map(({updateId}) => console.log({updateId})),
      catchError((err) => {
        console.error("Cannot upload files", {err})
        return of(null)
      }),
      finalize(() => this.uploadingFile = false)
    ).subscribe()
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
