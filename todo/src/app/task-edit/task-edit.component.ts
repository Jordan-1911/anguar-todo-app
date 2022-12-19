import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];

  taskData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { 
  }
  ngOnInit() { 
    this.restApi.getTask(this.id).subscribe((data: {}) => {
      this.taskData = data;
    })
  }
  // Update task data
  updateTask() {
    if(window.confirm('Are you sure you want to update?')){
      this.restApi.updateTask(this.id, this.taskData).subscribe(data => {
        this.router.navigate(['/task-list'])
        console.log("Hello World");
      })
    }
  }
}