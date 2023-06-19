import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Event} from "../models/Event";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly API = environment.api + '/api/event';

  constructor(private readonly http: HttpClient) { }

  getEventsBetweenDates(startDate: string, endDate: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API}/${startDate}/${endDate}`).pipe(
      map((events: Event[] | null) => {
        if (events === null) {
          return [];
        }
        return events.map((event: Event) => {
          return {
            ...event,
            date: event.date ? new Date(event.date) : null,
            createdAt: event.createdAt ? new Date(event.createdAt): null
          } as Event;
        });
      })
    );
  }

}
