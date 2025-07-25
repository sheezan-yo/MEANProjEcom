import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "../services/auth";

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    if (auth.isLoggedIn) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
}

export const adminGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    if (auth.isLoggedIn && auth.isAdmin) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
}