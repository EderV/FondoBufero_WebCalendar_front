import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {Logger} from "../utils/logger";
import {SessionStorageService} from "../services/session-storage.service";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly sessionStorageService: SessionStorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.logger.e("JWT not set or incorrect")
        this.sessionStorageService.clear()
        this.router.navigate(['/login'])
        return throwError(() => new Error(error.error));
      }

      return next.handle(req);
    }));
  }

}
