import { Component, OnInit } from '@angular/core';

import { ToDo } from './todo.model';
import { ToDoService } from './todo.service';

@Component({
  selector: 'app-documents',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [ToDoService]
})
export class ToDoComponent implements OnInit {
  selectedToDo: ToDo;

  constructor(private todoService: ToDoService) { }

  ngOnInit(): void {
    this.todoService.todoSelected
    .subscribe(
      (todo: ToDo) => {
        this.selectedToDo = todo;
      }
    );
  }

}
