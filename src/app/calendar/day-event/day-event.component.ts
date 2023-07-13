import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from "../../global/models/Event";

@Component({
  selector: 'app-day-event',
  templateUrl: './day-event.component.html',
  styleUrls: ['./day-event.component.scss']
})
export class DayEventComponent {

  @Input() dayNumber!: number
  @Input() events!: Event[]
  @Output() eventsOnDay = new EventEmitter<Event[]>()

  onDayClicked() {
    this.eventsOnDay.emit(this.events)
  }

}
