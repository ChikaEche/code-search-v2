import { Component } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProjectService } from '../core/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  projectName = '';
  toogleProject = false;

  constructor(
    private readonly projectService: ProjectService
  ) { }

  createProject() {
    this.projectService.createProject(this.projectName).pipe(
      map(() => console.log('project created')),
      catchError((err) => {
        console.error('Error while creating project', {err})
        return of(null)
      })
    ).subscribe()
  }
}
