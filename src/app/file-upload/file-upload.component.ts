import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Project } from '../core/interfaces/project';
import { FileUploadService } from '../core/services/file-upload.service';

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
    this.uploadingFile = true;
    this.fileUploadService.fileUpload(
      event.target.files[0], this.currentProject?.projectId as string,
      event.target.files[0].name
    ).pipe(
      tap((u) => {
        console.log(u?.updateId)
        this.uploadingFile = false
      }),
      catchError((err) => {
        this.uploadingFile = false;
        console.error("Error uploading file", {err});
        return of(null)
      })
    ).subscribe()
  }

}
