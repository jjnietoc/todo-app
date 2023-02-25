import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})

export class RoleGuardService implements CanActivate {
  constructor(private _router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    // checks if user is admin 
    if (!this.authService.user?.isAdmin) {
      alert("Forbidden.");
      this._router.navigate(["/todos"]);
      return false;

    } else {
      return true;
    }
  }
}
