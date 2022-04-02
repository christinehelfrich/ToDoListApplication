import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToDoService } from '../todo.service';
import { WindRefService } from 'src/app/wind-ref.service';

import { ToDo } from '../todo.model';
import { Subscription } from 'rxjs';
//import { relative } from 'path';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class ToDoDetailComponent implements OnInit {
  todo: ToDo;
  id: number;
  nativeWindow: any;
  private subscription: Subscription
  todos: ToDo[];

  constructor(private todoService: ToDoService,
              private route: ActivatedRoute,
              private router: Router,
              private windowRefService: WindRefService) {

                this.nativeWindow = windowRefService.getNativeWindow();
               }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.todo = this.todoService.getToDo(this.id)
      }
    )
  }

  onEditToDo() {
    //this.documentService.updateDocument(this.document, this.newDocument)
    this.router.navigate(['edit'], {relativeTo: this.route});

  }

  onDelete() {
    this.todoService.deleteToDo(this.todo);
    this.router.navigate(['/todos'], {relativeTo: this.route})
 }


}
