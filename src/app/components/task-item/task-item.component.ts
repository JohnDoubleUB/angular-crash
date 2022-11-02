import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task; //I keep having to mark it potentially as unidentified, because strict typing is on?
  faTimes = faTimes; //Adding in font awesome
  //Which we did by following instructions here: https://github.com/FortAwesome/angular-fontawesome

  constructor() { }

  ngOnInit(): void {
  }

}
