import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs'; //Bringing in observable and subject

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  //Call this when we click it
  toggleAddTask(): void
  {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask); //This will pass the task
  }

  //Use this to bind to wherever we care about
  onToggle(): Observable<any>
  {
    return this.subject.asObservable();
  }
}
