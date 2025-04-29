import { Component, OnDestroy, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from './tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent implements OnInit, OnDestroy {

  constructor(private tasksService: TasksService, private activatedRoute: ActivatedRoute) { }
  userTasks: Task[] = [];

  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe({
        next: (paramMap) => {
          const userId = paramMap.get('userId');
          if (userId) {
            this.userTasks = this.tasksService.getUserTasks(userId);
          }
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
