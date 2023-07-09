import { Component } from '@angular/core';
import {SessionStorageService} from "./global/services/session-storage.service";
import {Logger} from "./global/utils/logger";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WebCalendar_front';

  constructor(
    private readonly logger: Logger,
    private readonly sessionStorageService: SessionStorageService
  ) { }

  onReadSessionStorage() {
    const user = this.sessionStorageService.getItem('user')
    this.logger.i(user)
  }

}
