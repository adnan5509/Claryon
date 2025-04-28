import { Component, OnDestroy } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnDestroy {

  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }

  userName = '';
  private routeSub?: Subscription;

  ngOnInit() {
    this.routeSub = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const id = paramMap.get('userId');  // <<< use the correct param name from your route
        if (id) {
          const user = this.userService.getUser(id);
          this.userName = user?.name || '';
        }
      }
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
