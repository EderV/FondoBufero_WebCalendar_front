import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SessionStorageService} from "../services/session-storage.service";
import {UserStorage} from "../models/User";
import {Logger} from "../utils/logger";

export const authGuard: CanActivateFn = (route, state) => {
  const logger: Logger = inject(Logger)
  const router: Router = inject(Router)
  const sessionStorageService: SessionStorageService = inject(SessionStorageService)

  const now = new Date()
  const sessionStorageUser = sessionStorageService.getItem('user') as UserStorage

  if (sessionStorageUser === null) {
    logger.e('Nothing stored in session storage')
    router.navigate(['/page-not-found'])
    return false
  }

  const sessionExpirationDate = sessionStorageUser.sessionExpirationDate;

  if (sessionExpirationDate === null) {
    logger.e('Session expiration date not found')
    router.navigate(['/page-not-found'])
    return false
  }

  if (now > sessionExpirationDate) {
    logger.e('Session expired')
    router.navigate(['/page-not-found'])
    return false
  }

  logger.i('User is logged in')
  return true
}
