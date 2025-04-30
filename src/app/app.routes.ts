import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserTasksTitle, userNameResolver, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./users/users.routes";
import { UserTasksGaurd } from "./users/user-tasks/user-tasks.gaurd";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title: 'No Task Selected',
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        data: {
            message: 'Message for the User Tasks Component'
        },
        resolve: {
            userName: userNameResolver
        },
        title: resolveUserTasksTitle,
        canMatch: [UserTasksGaurd]
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page Not Found',
    }
]