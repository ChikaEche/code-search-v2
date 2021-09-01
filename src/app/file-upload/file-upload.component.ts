import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
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
    this.fileUploadService.fileUpload(
      event.target.files[0], this.currentProject?.projectId as string,
      event.target.files[0].name
    )
  }

}
