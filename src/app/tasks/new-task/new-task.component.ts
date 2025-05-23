import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  newTaskSubmitted = false;
  private tasksService = inject(TasksService);
  private router = inject(Router)

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.newTaskSubmitted = true;
    this.router.navigate(['/', 'users', this.userId(), 'tasks']);
  }
}

export const canLeaveEditTask: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.newTaskSubmitted) {
    return true;
  }
  if (component.enteredTitle() || component.enteredSummary() || component.enteredDate()) {
    return confirm('Do you want to leave this page?. All unsaved changes will be lost');
  }
  return false;
}
