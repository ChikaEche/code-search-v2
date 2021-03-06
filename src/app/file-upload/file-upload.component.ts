import { Component, Input, OnDestroy } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { Project } from '../core/interfaces/project';
import { FileUploadService } from '../core/services/file-upload.service';
import { filterFiles } from '../core/utils/filter-files';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnDestroy {

  @Input() currentProject: Project | null = null;
  uploadingFile = false;
  destroy$ = new Subject<void>();

  constructor(
    private readonly fileUploadService: FileUploadService
  ) {}

  uploadFile(event: any) {
    this.uploadingFile = true;
    const files = filterFiles(event.target.files) as File[];

    this.fileUploadService.fileUpload(files, this.currentProject?.projectId as string).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        console.error("Cannot upload files", {err})
        return of(null)
      }),
      finalize(() => this.uploadingFile = false)
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
