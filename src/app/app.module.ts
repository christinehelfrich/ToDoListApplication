import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ToDoComponent } from './todo/todo.component';
import { ToDoListComponent } from './todo/todo-list/todo-list.component';
import { ToDoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { ToDoItemComponent } from './todo/todo-list/todo-item/todo-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing-module';
import { ToDoEditComponent } from './todo/todo-edit/todo-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    ToDoListComponent,
    ToDoDetailComponent,
    ToDoItemComponent,
    DropdownDirective,
    ToDoEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
