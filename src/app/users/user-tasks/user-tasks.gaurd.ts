import { inject, Injectable } from "@angular/core";
import { CanMatch, Route, Router, UrlSegment } from "@angular/router";
import { UsersService } from "../users.service";

@Injectable({ providedIn: 'root' })
export class UserTasksGaurd implements CanMatch {
    constructor(private router: Router, private usersService: UsersService) { }
    canMatch(route: Route, segments: UrlSegment[]) {
        const userId = segments.length > 1 ? segments[1].path : null;
        const user = userId ? this.usersService.getUser(userId) : null;
        if (user?.active) {
            return true;
        } else if (user?.active === false && user.admin === true) {
            return true;
        }
        this.router.navigate(['/not-a-admin']);
        return false;
    }
}