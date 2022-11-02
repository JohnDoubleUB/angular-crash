import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { TASKS } from '../mock-tasks';
import { Observable, of } from 'rxjs'; //Adding observables


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]>
  {
    //return TASKS; //Error because this isn't an observable
    const tasks = of(TASKS);
    return tasks;
  }
}
