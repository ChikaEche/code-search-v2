import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Project } from '../core/interfaces/project';
import { FileUploadService } from '../core/services/file-upload.service';
import { ProjectService } from '../core/services/project.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  currentProject: Project | null = null;
  projectCount = 0;
  constructor(
    public readonly projectService: ProjectService,
    private readonly fileUploadService: FileUploadService
  ) { 
    this.projectService.currentProject$.pipe(
      tap((currentProject) => {
        this.currentProject = currentProject
        this.projectCount = currentProject?.files ? 
          Object.keys(currentProject.files).length : 0;
      })
    ).subscribe()
  }

  uploadFile(event: any) {
    console.log(event)
    this.fileUploadService.fileUpload(event.target.files[0])
  }

  

}
