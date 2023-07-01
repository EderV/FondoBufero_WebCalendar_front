import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../global/services/login.service";
import {UserLogin, UserToken} from "../global/models/User";
import {SessionStorageService} from "../global/services/session-storage.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";
import {Router} from "@angular/router";
import {Logger} from "../global/utils/logger";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = {username: '', password: ''}

  constructor(
    private readonly logger: Logger,
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {

  }

  submitLogin() {
    this.loginService.login(this.userLogin).subscribe({
      next: (userToken: UserToken) => {
        this.sessionStorageService.setItem('user', userToken)
        this.router.navigate(['/admin'])
      },
      error: (error) => this.logger.e(`Error login in. Error: ${error.error}`)
    })
  }

  checkSession() {
    console.log('User:')
    console.log(this.sessionStorageService.getItem('user'))
  }
}
