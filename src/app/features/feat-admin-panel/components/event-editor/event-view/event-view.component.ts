import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from "../../../../../core/models/Event";
import {Logger} from "../../../../../core/utils/logger";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent {

  constructor(
    private readonly logger: Logger
  ) { }

  @Input() event!: Event

  @Output() deleteEvent = new EventEmitter<Event>()
  @Output() eventClicked = new EventEmitter<Event>()

  onDeleteEvent() {
    this.logger.i(`Delete event with id: ${this.event.id}`)
    this.deleteEvent.emit(this.event)
  }

  onComponentClicked() {
    this.logger.i(`Clicked on event view component. Event id: ${this.event.id}`)
    this.eventClicked.emit(this.event)
  }
}
