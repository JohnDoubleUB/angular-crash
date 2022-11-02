import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = 'Task Tracker';
  constructor() { }
  
  /**This is what you want to use most of the time when initializing code
   * when a component loads, or when you want to make a http request
   * **/
  ngOnInit(): void {
  }

  toggleAddTask() 
  {
    console.log("toggleeee");
  }
}
