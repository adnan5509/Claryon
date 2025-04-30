import { CanActivateFn, Router, Routes } from "@angular/router";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";
import { TasksComponent, tasksResolver } from "../tasks/tasks.component";
import { inject } from "@angular/core";


const AddNewTaskGaurd: CanActivateFn = (route, segments) => {
    const router = inject(Router);
    if (route.params['userId'] === 'u1' || route.params['userId'] === 'u2') {
        return true;
    }
    router.navigate(['/goAway']);
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