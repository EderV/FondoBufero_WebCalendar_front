import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {SessionStorageService} from "../services/session-storage.service";
import {UserToken} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionStorageService: SessionStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken: UserToken = this.sessionStorageService.getItem('user');

    if (userToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken.accessToken}`
        }
      });
    }

    return next.handle(request);
  }

}
