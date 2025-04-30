import { CanActivateFn, Router, Routes } from "@angular/router";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";
import { TasksComponent, tasksResolver } from "../tasks/tasks.component";
import { inject } from "@angular/core";
import { UsersService } from "./users.service";


const AddNewTaskGaurd: CanActivateFn = (route, segments) => {
    const router = inject(Router);
    const userService = inject(UsersService);
    const userId = route.params['userId'];
    if (userService.getUser(userId)?.active) {
        return true;
    }
    router.navigate(['/not-a-member']);
    return false;
}
export const userRoutes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: TasksComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
            userTasks: tasksResolver
        }
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        title: 'Add New Task',
        canActivate: [AddNewTaskGaurd]
    }
]