import { Component } from '@angular/core';
import {SessionStorageService} from "./core/services/session-storage.service";
import {Logger} from "./core/utils/logger";
import {environment} from "../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected readonly activeProfile = environment.profile

  title = 'WebCalendar_front'

  isCalendarActive = true
  isAboutActive = false

  constructor(
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly sessionStorageService: SessionStorageService
  ) { }

  onCalendarButton() {
    if (!this.isCalendarActive) {
      this.router.navigate(['/calendar'])

      this.isCalendarActive = true
      this.isAboutActive = false
    }
  }

  onAboutButton() {
    if (!this.isAboutActive) {
      this.router.navigate(['/about'])

      this.isCalendarActive = false
      this.isAboutActive = true
    }
  }

  onReadSessionStorage() {
    const user = this.sessionStorageService.getItem('user')
    this.logger.i(user)
  }

  onClearSessionStorage() {
    this.sessionStorageService.clear()
  }

}
