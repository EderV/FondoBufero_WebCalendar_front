import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class Logger {

  private readonly enableLogging = environment.enableLogging

  i(...data: any[]) {
    if (this.enableLogging) {
      console.info(data)
    }
  }
  e(...data: any[]) {
    if (this.enableLogging) {
      console.error(data)
    }
  }

}
