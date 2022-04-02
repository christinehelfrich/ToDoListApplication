import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ToDo } from '../../todo.model';
import { ToDoService } from '../../todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class ToDoItemComponent implements OnInit {
  @Input() todo: ToDo;
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
        this.todos = todos}
    )
  }

  onEditToDo() {
    //this.documentService.updateDocument(this.document, this.newDocument)
    console.log("wedoedittt")
    this.router.navigate(['edit'], {relativeTo: this.route});

  } 

  onDelete() {
    this.todoService.deleteToDo(this.todo);
    this.router.navigate(['/todo'], {relativeTo: this.route})
 }



}
