import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../core/interfaces/project';
import { FileUploadService } from '../core/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() currentProject: Project | null = null;

  constructor(
    private readonly fileUploadService: FileUploadService
  ) { }

  uploadFile(event: any) {
    this.fileUploadService.fileUpload(
      event.target.files[0], this.currentProject?.projectId as string,
      event.target.files[0].name
    )
  }

}
