import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)

  console.log('Auth guard working!')
  return true;
};
