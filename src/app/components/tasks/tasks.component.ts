import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TASKS } from '../../mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = TASKS; //We want to change this so that we are calling a service rather than this mock tasks thing
  constructor() { }

  ngOnInit(): void {
  }

  //create a service using angular by calling: ng generate service services/task

}
