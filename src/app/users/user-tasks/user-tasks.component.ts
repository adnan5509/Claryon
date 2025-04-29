import { Component, inject, input, OnDestroy } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent {
  message = input.required<string>();
  userName = input.required<string>();
}

export const userNameResolver: ResolveFn<string> = (activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
  const userService = inject(UsersService);
  const userName = userService.getUser(activatedRouteSnapshot.params['userId'])?.name || '';
  return userName;
}

export const resolveUserTasksTitle: ResolveFn<string> = (activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
  return userNameResolver(activatedRouteSnapshot, routerStateSnapshot) + '\'s Tasks';
}
