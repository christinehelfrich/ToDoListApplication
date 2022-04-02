import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ToDo } from '../todo.model';
import { ToDoService } from '../todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class ToDoListComponent implements OnInit {
  //@Output() documentWasSelected = new EventEmitter<Document>();
  todos: ToDo[];
  private subscription: Subscription;

  constructor(private todoService: ToDoService,
            private router: Router,
            private route: ActivatedRoute) { 

            }

  ngOnInit(): void {
    this.todoService.getToDos();
    this.subscription = this.todoService.todoListChangedEvent
    .subscribe(
      (todos: ToDo[]) => {
        this.todos = todos
        
      }
    )

  }


  onNewToDo() {
    this.router.navigate(['new'], {relativeTo: this.route});
    //const newDocument = new Document('3', 'Mock New Document', "Hey you created a new doc","https://www.youtube.com/watch?v=dQw4w9WgXcQ", [])
    //this.documentService.addDocument(newDocument);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
/*
  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
   }
*/
}
