import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, collection, getDocs, where, query, documentId } from '@angular/fire/firestore';
import { MeilisearchService } from './meilisearch.service';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, of } from 'rxjs';
import { UserService } from './user.service';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  currentProject$: BehaviorSubject<Project | null> = new BehaviorSubject<Project | null>(null);

  get usersCollection() {
    return collection(this.firestore, 'users');
  }

  get projectsCollection() {
    return collection(this.firestore, 'users', 'projects', '')
  }

  constructor(
    private readonly userService: UserService,
    private readonly firestore: Firestore,
    private readonly meilisearchService: MeilisearchService
  ) {}

  private createProjectDocument(id: string, data: Partial<unknown>) {
    const ref =  doc(this.firestore, `projects/${id}`)
    return from(setDoc(ref, data));
  }

  createProject(name: string) {
    return this.meilisearchService.createIndex().pipe(
      switchMap(({ uid }) => {
        return this.createProjectDocument(uid, {
          name,
          files: {},
          userId: this.userService.getCurrentUser()?.userId,
        }).pipe(
          map(() => uid)
        )
      })
    )
  }

  getCurrentProject() {
    return this.currentProject$.value;
  }

  getProjects(userId: string) {
    documentId()
    const ref = collection(this.firestore, 'projects')
    return from(getDocs(query(ref, where('userId', "==", userId))))
  }

}
