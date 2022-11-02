//Creating an interface to deal with tasks
//export means that we can bring this into other files
export interface Task 
{
    id?: number //Nullable using? thats cool
    text: string; //I like strongly typed javascript 
    day: string;
    reminder: boolean;
}