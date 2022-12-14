import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service'; //Add our ui service
import { Subscription } from 'rxjs'//We also need subscription
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask: boolean = false; //This will be used to change the button text and color
  subscription: Subscription;

  constructor(private uiService: UiService, private router: Router) { } //Include the UiService and now also router
  
  /**This is what you want to use most of the time when initializing code
   * when a component loads, or when you want to make a http request
   * **/
  ngOnInit(): void {
    //We want to subscribe to this
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => this.showAddTask = value)
  }

  toggleAddTask() 
  {
    this.uiService.toggleAddTask();
  }

  //Created a conditional
  hasRoute(route: string)
  {
    return this.router.url === route;
  }
}
