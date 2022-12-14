import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task'
import { UiService } from '../../services/ui.service'; //Add it here
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter(); //Emit for the form submission
  text: string;
  day: string;
  reminder: boolean = false; //Set a default value
  subscription: Subscription;
  showAddTask: boolean;
  //We want to set a two way data binding for the input of these fields

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value)=>{
        this.showAddTask = value;
      });
  }

  onSubmit() 
  {
    //Just some super simple validation
    if(!this.text) 
    {
      alert('Please add a task!');
      return;
    }

    const newTask = 
    {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask)

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
