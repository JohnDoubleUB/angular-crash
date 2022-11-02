import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

//We want buttons to do something else on click, we don't neccesarily want that defined in here, so what we want is an event emitter
//Adding Input here
//Adding components in Angular command: ng generate component relativedirectoryifneeded/componentname
//To serve application: ng serve

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {  
  @Input() text: string | undefined; 
  @Input() color: string | undefined;
  @Output() btnClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit(); //Emit our button call, an event that things can careabout
  }
}
