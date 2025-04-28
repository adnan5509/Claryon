import { Component, input } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {

  constructor(private userService: UsersService) { }

  userId = input.required<string>();

  user = this.userService.getUser(this.userId());


}
