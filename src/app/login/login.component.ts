import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../global/services/login.service";
import {UserLogin, UserToken} from "../global/models/User";
import {SessionStorageService} from "../global/services/session-storage.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = {username: '', password: ''}

  constructor(
    private readonly loginService: LoginService,
    private readonly sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {

  }

  submitLogin() {
    this.loginService.login(this.userLogin).subscribe({
      next: (userToken: UserToken) => {
        this.sessionStorageService.setItem('user', userToken)
        // TODO Redirect to admin panel
      },
      error: (error) => console.log('Error in login: ', error)
    })
  }

  checkSession() {
    console.log('User:')
    console.log(this.sessionStorageService.getItem('user'))
  }
}
