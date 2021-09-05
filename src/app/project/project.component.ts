import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { Project } from '../core/interfaces/project';
import { AuthService } from '../core/services/auth.service';
import { ProjectService } from '../core/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  projectName = '';
  toogleProject = false;
  projects: Project[] = [];
  userId = '';
  loading = false;
  destroy$ = new Subject<void>();
  @Output() onProjectChange = new EventEmitter();

  constructor(
    private readonly projectService: ProjectService,
    private readonly authService: AuthService
  ) {
    this.projectService.currentProject$.pipe(
      tap(() => this.onProjectChange.emit('project changed')),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  ngOnInit() {
    this.authService.user$.pipe(
      tap(({ userId }) => {
        this.userId = userId;
        this.getProjects(userId)
      })
    ).subscribe()
  }

  selectProject(project: Project) {
    this.projectService.currentProject$.next(project)
  }

  createProject() {
    this.loading = true;
    this.projectService.createProject(this.projectName).pipe(
      takeUntil(this.destroy$),
      tap((projectId) => {
        this.projects = [
          ...this.projects, 
          {
            name: this.projectName,
            userId: this.userId,
            projectId
          }
        ];
        this.projectName = '';
      }),
      catchError((err) => {
        console.error('Error while creating project', {err})
        return of(null)
      }),
      finalize(() => this.loading = false)
    ).subscribe()
  }

  getProjects(userId: string) {
    this.projectService.getProjects(userId).pipe(
      takeUntil(this.destroy$),
      tap((doc) => {
        this.projects = [];
        doc.forEach((project) => {
          this.projects = [...this.projects, {...project.data(), projectId: project.id} as Project]
        })
      })
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
