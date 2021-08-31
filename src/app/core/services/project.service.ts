import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { MeilisearchService } from './meilisearch.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private userId = '';

  constructor(
    private readonly authService: AuthService,
    private readonly firestore: Firestore,
    private readonly meilisearchService: MeilisearchService
  ) { 
    this.authService.user$.pipe(
      tap(({userId }) => this.userId = userId)
    ).subscribe();
  }

  createProject(projectName: string) {
    return this.meilisearchService.createIndex().pipe(
      tap(({ uid }) => {
        console.log({uid})
        setDoc(
          doc(this.firestore, `projects/${this.userId}`),
          {
            uid,
            projectName,
            files: []
          }
        )
      })
    )
  }

}
