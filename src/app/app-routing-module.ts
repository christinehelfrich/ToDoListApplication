import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ToDoDetailComponent } from "./todo/todo-detail/todo-detail.component";
import { ToDoEditComponent } from "./todo/todo-edit/todo-edit.component";
import { ToDoComponent } from "./todo/todo.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
    { path: 'todo', component: ToDoComponent, children: [
        {path: 'new', component: ToDoEditComponent},
        {path: ':id', component: ToDoDetailComponent},
        {path: ':id/edit', component: ToDoEditComponent}
    ] }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}