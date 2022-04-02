import { 
  Component, 
  OnInit, 
  ViewChild 
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToDoService } from '../todo.service';
import { ToDo } from '../todo.model';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class ToDoEditComponent implements OnInit {
  @ViewChild('f', { static: false }) dForm: NgForm;
  subscripton: Subscription;
  id: number;
  editMode: boolean = false;
  originalToDo: ToDo;
  todo: ToDo;
  todos: ToDo[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private todoService: ToDoService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );

    this.route.params
    .subscribe (
      (params: Params) => {
        this.id = params['id'];
        if (this.id !== undefined) {
          console.log(this.id)
          this.originalToDo = this.todoService.getToDo(this.id);
          console.log(this.originalToDo)
 
        }
        else {
          this.editMode = false;

          return
        }
        console.log(this.editMode)

        if (this.originalToDo !== null || undefined || "") {
          //console.log(params['id'])
          this.editMode = true;
  
          
          this.todo = JSON.parse(JSON.stringify(this.originalToDo));
          //console.log("the original doc is not null or undefined. original doc: " + this.originalDocument)
        }
        else {
          console.log("the original doc is null or undefined. original doc: " + this.originalToDo)
          return
        }
      }
    )


  }

  onCancel() {
    this.router.navigateByUrl('/todos')

  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newId = String(this.id)
    console.log(this.editMode)
    const newToDo = new ToDo(    
      newId,  
      form.value.name,
      form.value.description,
      form.value.priority
      );
      console.log(newToDo)

    if (this.editMode == true) {
      console.log(this.editMode)
      console.log(`editcomp id =  ${this.id}`)
      this.todoService.updateToDo(this.originalToDo, newToDo, this.id)
    }
    else {
      console.log(this.editMode)
      console.log(newToDo)
      this.todoService.addToDo(newToDo);
      //this.router.navigate(['new'], {relativeTo: this.route});

    }
    


  }

}
