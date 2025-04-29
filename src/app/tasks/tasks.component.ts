import { Component, input, OnDestroy, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit, OnDestroy {

  constructor(private tasksService: TasksService, private activatedRoute: ActivatedRoute) { }

  userId = input.required<string>();

  subscriptions: Subscription[] = [];
  order: 'asc' | 'desc' = 'desc';

  get userTasks(): Task[] {
    return this.tasksService.getUserTasks(this.userId()).sort((a, b) => {
      if (this.order === 'asc') {
        return a.dueDate > b.dueDate ? 1 : -1;
      } else {
        return a.dueDate < b.dueDate ? 1 : -1;
      }
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe(
        {
          next: (param) => {
            this.order = param['order'];
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
