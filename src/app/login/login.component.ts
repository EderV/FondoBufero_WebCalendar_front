import {Component, OnInit} from '@angular/core';
import {LoginService} from "../global/services/login.service";
import {UserLogin, UserStorage, UserToken} from "../global/models/User";
import {SessionStorageService} from "../global/services/session-storage.service";
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
        const userStorage = this.createUserStorage(userToken)

        this.sessionStorageService.clear()
        this.sessionStorageService.setItem('user', userStorage)
        this.router.navigate(['/admin'])
      },
      error: (error) => this.logger.e(`Error login in. Error: ${error.error}`)
    })
  }

  checkSession() {
    console.log('User:')
    console.log(this.sessionStorageService.getItem('user'))
  }

  private createUserStorage(userToken: UserToken): UserStorage {
    const loginDate = new Date()
    const expirationDate = new Date()
    expirationDate.setMinutes(loginDate.getMinutes() + userToken.sessionExpiration)

    return {
      userId: userToken.userId,
      accessToken: userToken.accessToken,
      loginDate: loginDate,
      sessionExpirationDate: expirationDate
    }
  }

}
