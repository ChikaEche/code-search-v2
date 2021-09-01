import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from '../core/interfaces/project';
import { AuthService } from '../core/services/auth.service';
import { ProjectService } from '../core/services/project.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projectName = '';
  toogleProject = false;
  projects: Project[] = [];
  userId = '';
  loading = false;

  constructor(
    private readonly projectService: ProjectService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user$.pipe(
      tap(({ userId }) => {
        this.userId = userId;
        this.getProjects(userId)
      })
    ).subscribe()
  }

  selectProject(project: Project) {
    this.projectService.currentProject$.next(project);
  }

  createProject() {
    this.loading = true;
    this.projectService.createProject(this.projectName).pipe(
      tap((projectId) => {
        this.projects = [
          ...this.projects, 
          {
            name: this.projectName,
            userId: this.userId,
            files: {},
            projectId
          }
        ];
        this.loading = false;
        this.projectName = '';
      }),
      catchError((err) => {
        this.loading = false;
        console.error('Error while creating project', {err})
        return of(null)
      })
    ).subscribe()
  }

  getProjects(userId: string) {
    this.projectService.getProjects(userId).pipe(
      tap((doc) => {
        doc.forEach((project) => {
          this.projects = [...this.projects, {...project.data(), projectId: project.id} as Project]
        })
      })
    ).subscribe()
  }
}
