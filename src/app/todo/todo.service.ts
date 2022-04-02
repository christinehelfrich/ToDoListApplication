import { EventEmitter, Output, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ToDo } from "./todo.model";



@Injectable()
export class ToDoService {
    todoListChangedEvent = new Subject<ToDo[]>();
    startedEditing = new Subject<number>();
    @Output() todoSelected = new EventEmitter<ToDo>();
    @Output() todoChangedEvent = new EventEmitter<ToDo[]>();

    todos: ToDo[] = []; 
    maxToDoId: number;
    constructor(private http: HttpClient) {
        this.getToDoshttp()
     }


          getMaxId(todos): number {
         let maxId = 0

         todos.forEach(todo => {
             let currentId = Number(todo.id);
             if(currentId > maxId) {
                 maxId = currentId;
                 return maxId;
             }
             else {
                 return maxId;
             }

         })
         return maxId

     }

     getToDos() :ToDo[] {
         return this.todos.slice()
     }


     getToDoshttp() {
        this.http
        .get<{message: string; todos: any}>(
            "http://localhost:3000/todo"
        )
        .pipe(map((todoData) => {
            return todoData.todos.map(todo => {
                return {
                    name: todo.name,
                    description: todo.description,
                    priority: todo.priority,
                    id: todo.id
                }
            })
        }))
        .subscribe(
            (todos: ToDo[] ) => {
              console.log("calling get")
                this.todos = todos;
                this.maxToDoId = this.getMaxId(this.todos)
                //this.documents.sort()
                this.todoListChangedEvent.next([...this.todos])
            })
        
    }

    getToDosUpdateListener() {
        return this.todoChangedEvent.asObservable()
    }

    storeToDos() {
        let todos = JSON.stringify(this.todos);
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
        this.http
            .put(
              'http://localhost:3000/todo',
              todos, {
                  headers: {'header1': 'content-type', 'header2':'application/json', 'header3': 'Access-Control-Allow-Origin', 'header4': '*'}
              }
            )
            .subscribe(response => {
              this.todoListChangedEvent.next(this.todos);
            });

    }

    getTheToDo(index: number) {
        
        this.getToDoshttp();
        this.todoListChangedEvent
        .subscribe(
          (todos: ToDo[]) => {
            this.todos = todos
            
          }
        )
        
        return this.todos[index];
    }

    getToDo(id): ToDo {
        let todovar = null
        
        this.todos.forEach(todo => {
            if (todo.id == id) {
                todovar = todo    
                return todovar
            }
        });
        return todovar;
    }

    deleteToDo(todo: ToDo) {

        if (!todo) {
          return;
        }
    
        const pos = this.todos.findIndex(d => d.id === todo.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/todo/' + todo.id)
          .subscribe(
            (response: Response) => {
              this.todos.splice(pos, 1);
              //this.sortAndSend();
            
            }
          );
      }
    

     addToDo(todo: ToDo) {
         if (!todo) {
             return
         }
         console.log(todo)

         todo.id = "";
         const headers = new HttpHeaders({'Content-Type': 'application/json'});
         this.http.post<{ message: string, todo: ToDo }>('http://localhost:3000/todo',
         todo,
         { headers: headers })
         .subscribe(
           (responseData) => {
             // add new document to documents
             //console.log(responseData.todo)
             console.log(responseData.todo)
             this.todos.push(responseData.todo);
             //console.log(this.todos)
             //this.sortAndSend();
           }
         );

     }

     updateToDo(originalToDo: ToDo, newToDo: ToDo, id) {
        if (!originalToDo || !newToDo) {
            return;
          }
      
          const pos = this.todos.findIndex(d => d.id === originalToDo.id);
      
          if (pos < 0) {
            return;
          }
      
          // set the id of the new Document to the id of the old Document
          newToDo.id = originalToDo.id;
          //newDocument._id = originalDocument._id;
          console.log(newToDo)
          console.log(originalToDo)
      
          const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
          // update database
          this.http.put('http://localhost:3000/todo/' + id,
            newToDo, { headers: headers })
            .subscribe(
              (response: Response) => {
                  console.log(this.todos[pos])
                this.todos[pos] = newToDo;
                //this.sortAndSend();
              }
            );
     }


}