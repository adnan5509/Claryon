import { Component, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userTasks = input.required<Task[]>();
  userId = input.required<string>();
  order = input.required<string>();
}

export const tasksResolver: ResolveFn<Task[]> = (activatedRouteSnapshot: ActivatedRouteSnapshot,) => {
  const tasksService = inject(TasksService);
  const order = activatedRouteSnapshot.queryParams['order'];
  const userId = activatedRouteSnapshot.params['userId'];

  const userTasks = tasksService.getUserTasks(userId);

  if (order && order === 'asc') {
    userTasks.sort((a, b) => a.dueDate > b.dueDate ? 1 : -1);
  } else {

    userTasks.sort((a, b) => a.dueDate < b.dueDate ? 1 : -1);
  }
  return userTasks.length > 0 ? userTasks : [];
}
