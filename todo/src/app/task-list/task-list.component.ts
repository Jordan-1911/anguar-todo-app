import { Component, Input, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  Task: any = [];

  @Input()
    taskDetails = { name: '', id: '', isComplete: false };
  
    constructor(
      public restApi: RestApiService,
      public router: Router
    ) { }
  
  
  // Get tasks list
  loadTasks() {
    return this.restApi.getTasks().subscribe((data: {}) => {
      this.Task = data;
    });
  }
  // Delete task
  deleteTask(id: any) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.restApi.deleteTask(id).subscribe((data) => {
        this.loadTasks();
      });
    }
  }

  ngOnInit() {
    this.loadTasks();
  }

addTask(dataTask: any) {
  this.restApi.createTask(this.taskDetails).subscribe((data: {}) => {
    this.router.navigate(['/task-list'])
    this.ngOnInit();
    this.taskDetails.name = '';

  })
}





}