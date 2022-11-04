import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'
import { Task } from '../../Task';
import { TASKS } from '../../mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []; //We want to change this so that we are calling a service rather than this mock tasks thing

  //we have to add a service into the constructor like this to be able to use it
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    //this.tasks = this.taskService.getTasks(); //This wouldn't work with async data
    //This is usually not how you'd want to do this, you'd want to use observables if you're using asyncronous data
    //You instead subscribe to an observable so you can constantly watch it
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks); //This is a bit like a promise, because this will happen if and when we get data back
  }

  //create a service using angular by calling: ng generate service services/task
  deleteTask(task: Task)
  { 
    console.log(task);
    this.taskService.deleteTask(task)
    .subscribe(() => 
    {
      this.tasks = this.tasks.filter(t => t.id !== task.id); //Using filter to then remove this result locally
    });
  }

}
