import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../global/services/login.service";
import {UserLogin, UserToken} from "../global/models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = {username: '', password: ''}

  constructor(private readonly loginService: LoginService) { }

  ngOnInit(): void {

  }

  submitLogin() {
    this.loginService.login(this.userLogin).subscribe(
      (userToken: UserToken) => console.log('Success', userToken),
      (error) => console.log('Error received', error)
    )
  }

}
