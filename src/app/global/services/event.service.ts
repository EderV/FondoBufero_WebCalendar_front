import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../models/Event";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly API = environment.api + '/api/event';

  constructor(private readonly http: HttpClient) { }

  getEventsBetweenDates(startDate: string, endDate: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API}/${startDate}/${endDate}`)
  }

}
