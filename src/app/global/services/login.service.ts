import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserLogin, UserToken} from "../models/User";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = environment.api;

  constructor(private readonly http: HttpClient) { }

  login(userLogin: UserLogin): Observable<UserToken> {
    return this.http.post<UserToken>(`${this.API}/api/auth/login`, userLogin)
  }

}
