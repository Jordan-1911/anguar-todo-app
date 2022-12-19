import { Component, OnInit, Input } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  
    @Input()
    taskDetails = { name: '', id: '', isComplete: false };
  
    constructor(
      public restApi: RestApiService,
      public router: Router
    ) { }
  

    Task: any = [];
  
  ngOnInit() {
    this.loadTasks();
  }
  addTask(dataTask: any) {
    this.restApi.createTask(this.taskDetails).subscribe((data: {}) => {
      this.router.navigate(['/task-list'])
    })
  }
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
}

