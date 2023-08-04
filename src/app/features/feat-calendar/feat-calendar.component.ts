import {Component, OnInit} from '@angular/core';
import {EventService} from "../../core/services/event.service";
import {Event} from "../../core/models/Event";


@Component({
  selector: 'app-feat-calendar',
  templateUrl: './feat-calendar.component.html',
  styleUrls: ['./feat-calendar.component.scss']
})
export class FeatCalendarComponent {

  errorReachingData = false

  constructor(private readonly eventService: EventService) { }


  reload(): void { }

}
