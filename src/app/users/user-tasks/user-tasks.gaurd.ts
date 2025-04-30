import { Injectable } from "@angular/core";
import { CanMatch, Route, Router, UrlSegment } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class UserTasksGaurd implements CanMatch {
    constructor(private router: Router) { }
    canMatch(route: Route, segments: UrlSegment[]) {
        const isAllowed = Math.random() > 0.5;
        if (isAllowed) {
            return true;
        }
        this.router.navigate(['/unauthorized']);
        return false;
    }
}