import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Project } from '../core/interfaces/project';
import { FileUploadService } from '../core/services/file-upload.service';
import { fileTypes } from '../core/utils/fileTypes';
import { filterFiles } from '../core/utils/filter-files';

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
    const files = filterFiles(event.target.files) as File[];
    'l'

    this.fileUploadService.fileUpload(files, this.currentProject?.projectId as string).pipe(
      map(({updateId}) => console.log({updateId})),
      catchError((err) => {
        console.error("Cannot upload files", {err})
        return of(null)
      }),
      finalize(() => this.uploadingFile = false)
    ).subscribe()
  }

}
