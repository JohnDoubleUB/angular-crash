# AngularCrash

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.

## Where I got up to on the tutorial
https://youtu.be/3dHNOWTI7H8?t=3802

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Notes

Tutorial I'm going through: https://github.com/bradtraversy/angular-crash-2021/blob/main/src/app/components/task-item/task-item.component.css

app.component is the default "entry point"
much like in react, you can create tags which are then turned into their corresponding objects when displayed

so a component called 'tasks' can be run by simply creating tags: <app-tasks></app-tasks>

you can also pass parameters to them, and then accept them in the constructor for a component found in its corresponding .ts file

Typescript lets you define things like Interfaces, it lets you agree apon data structures in js which is really nice

This is an example of an exported interface, its an agreed upon structure?:

    export interface Task 
    {
        id?: number //Nullable using? thats cool
        text: string; //I like strongly typed javascript 
        day: string;
        reminder: boolean;
    }

You can essentially use [] for directives and there are also certain thing like *ngFor="let task of tasks" that even let you create a for loop right in the tag 'let' and 'of' being keywords

    <app-task-item *ngFor="let task of tasks" [task]="task"></app-task-item> 

[ngStyle] lets you inline declare styling? I'm not sure this is good practice but you can:
    <tag [ngStyle]="{'color': 'red'}"> </tag>

using variables from the component in standard tags requires {{}} so for a variable declared in the component as "name":
    <h2>{{name}}</h2>

[task] allowing you to essentially refer to that variable inside of that object and give it as a parameter similarly to how described below

There are Input and Output modules

Input allows a angular component to accept inputs the same way you would in react essentially:
    <tagname inputName="inputData"></tagname>

where you can then accept that in the constructor using:
    @Input() inputName: string; after an import

You can also setup Event emitters so you can respond to events from other objects:
    <app-button (btnClick)="toggleAddTask()">

where btnClick is defined inside app-button component as:
    @Output() btnClick = new EventEmitter();

which can then be called somewhere using
    this.btnClick.emit();

This can let you set conditional class styling, so in this case if task.reminder is true, reminder class is applied
    [ngClass]="{reminder: task.reminder}"

You can handle submitting of forms in form tags using (ngSubmit) this will allow us to nicely handle the form and do things without having to worry about defaults etc

if we just want to send our events arguments perhaps because we don't have access to the data at that given level, we can do $event in the arguments:
    <!-- $event because we don't have access to task here -->
    <app-add-task (onAddTask)="addTask($event)"></app-add-task>

### DOM events (for binding functionality)
Useful list because we can tap into all these events:
https://www.w3schools.com/jsref/dom_obj_event.asp


### Different Request Types
See the services folder for more implementation details of this

### What is a http header?
An HTTP header is a field of an HTTP request or response that passes additional context and metadata about the request or response
we need one for the update request or rather known as 'put', we're using it in several places so we do this:
    const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type' : 'application/json'
    })
    }

### For this project to work:
please run both commands:
    ng serve
    npm run server

This will ensure that both the site is running and the mock server for it

### Useful commands

#### Create a new component:
    ng generate component componentFolder/componentName

#### Serve your site (so you can see it):
    ng serve

then you can use ctl + c to end the process on that terminal

#### Create a service:
    ng generate service serviceFolder/serviceName

#### Adding font-awesome:
can be easily done by following instructions here: https://github.com/FortAwesome/angular-fontawesome

### Using a service (Front-end)

In order to use a service it needs to be imported but also registered as a provider in the constructor, so for an import of:
    import { TaskService } from '../../services/task.service'

in the constructor of our class:
    @Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
    })
    export class TasksComponent implements OnInit {
    tasks: Task[] = []; //We want to change this so that we are calling a service rather than this mock tasks thing

    constructor(private taskService: TaskService) { }
    }

the constructor part includes this service

just below the constructor if you wanted to store this data from the service you could do the following in the ngOnInt() function (default init funciton of the component on creation)

this could look like the following:
    ngOnInit(): void {
        this.tasks = this.taskService.getTasks(); //We aren't using observables yet? 
        //This is usually not how you'd want to do this, you'd want to use observables if you're using asyncronous data
    }

However when using async data this is probably not quite how we'd do it:

so first in the service itself, we'd do this:

    import { Observable, of } from 'rxjs'; //Adding observables

we'd change the return type of getTasks() from Task[] to Observable<Task[]>

and it would look more like this:

    getTasks(): Observable<Task[]>
    {
        //return TASKS; //Error because this isn't an observable
        const tasks = of(TASKS);
        return tasks;
    }

except we wouldn't be doing of because right now we're faking the way the code should behave if connected to an endpoint to get this info

Then in the component we'd want to then Subscribe to the event and use an arrow function much like a promise to listen and respond when this observable finishes getting the data, it'd look like this:

    ngOnInit(): void {
        this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks); //This is a bit like a promise, because this will happen if and when we get data back
    }

### Setting up a server for testing this in a more realworld setting (json-server)
It's a full fake RESTAPI with zero coding, its really good for this type of thing
https://www.npmjs.com/package/json-server

install using: npm install -g json-server

then create some data db.json
example file is:

    {
    "posts": [
        { "id": 1, "title": "json-server", "author": "typicode" }
    ],
    "comments": [
        { "id": 1, "body": "some comment", "postId": 1 }
    ],
    "profile": { "name": "typicode" }
    }

and then start the server using: json-server --watch db.json

Now if you go to http://localhost:3000/posts/1, you'll get

    { "id": 1, "title": "json-server", "author": "typicode" }

All the info is on the link for the package, but then you can make GET, POST, PUT, PATCH and DELETE requests for this data

Under package.json "scripts":
add:
    "server": "json-server --watch db.json --port 5000"

that will essentially be our database server (for testing these things atleast)

Then we just need to create this file

Now to run it we just call (because we called it "server" in scripts): npm run server

### Switching to the httpclient to use this mock server
So angular actually has its own httpclient, so we'll use that
    import {HttpClient, HttpHeaders} from '@angular/common/http';

This will allow us to make our requests

We will also have to add this to our component as a module so we can use it
    app.module.ts

This is where all our components are also registered, one unified place, which is also why we don't have to do as much importing as in React
    import { HttpClientModule } from '@angular/common/http'; //We add this so we can do the http client stuff in our project

then make sure to include that in the imports with our other stuff:
    
    @NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ButtonComponent,
        TasksComponent,
        TaskItemComponent
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        HttpClientModule //Here it is added to this too!
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }

Then in the service itself we just need to make sure we know the url for the api and then also inject the httpClient into the constructor as seen below:


    export class TaskService {
    private apiUrl = "http://localhost:5000/tasks"; //Self explanatory but this is where the database is running

    constructor(private http: HttpClient) { } //Then make sure to include it in the constructor for the service

    getTasks(): Observable<Task[]>
    {
        //return TASKS; //Error because this isn't an observable
        // const tasks = of(TASKS); //We are changing this again to allow us to use the fake server
        // return tasks;
        //Added triangle brackets to fix the issue with the returned type not being of Task
        return this.http.get<Task[]>(this.apiUrl); //This is the new line that actually gets data from the server
    }

### Setting up two way binding for inputs
So in the case of forms, we might want to bind the fields two way (so it can be set through code or set through changes to the fields).

To do this we need to include a new module in app.module.ts:
    import { FormsModule } from '@angular/forms';

and then include it in the modules list too as an import like we did with font awesome. This will let us use the ngModel directive

And then in the form we can do this, We are using [()] because we want to define a two way data binding:
    <input type="text" name="text" id="text" placeholder="Add Task" [(ngModel)]="text"> 

"text" refering to a component variable, you supposedly also need a name attribute storing this same value for it to work, hence that name="text"