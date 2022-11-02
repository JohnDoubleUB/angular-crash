import { Injectable } from '@angular/core';
//So we can make those http requests to any client but right now our fake one
//We also need to add this as a module to our component
import {HttpClient, HttpHeaders} from '@angular/common/http'; 

import { Task } from '../Task';
import { TASKS } from '../mock-tasks'; //We don't need this anymore for testing
import { Observable, of } from 'rxjs'; //Adding observables, we also don't neccesarily need of as we aren't faking the data now


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:5000/tasks"; //Self explanatory but this is where the database is running
  
  constructor(private http: HttpClient) { } //Then make sure to include it in the constructor for the service

  getTasks(): Observable<Task[]> //This stays the same
  {
    //return TASKS; //Error because this isn't an observable
    // const tasks = of(TASKS); //We are changing this again to allow us to use the fake server
    // return tasks;
    //Added triangle brackets to fix the issue with the returned type not being of Task
    return this.http.get<Task[]>(this.apiUrl);

  }
}
