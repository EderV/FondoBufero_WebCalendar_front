import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from "../../global/models/Event";

@Component({
  selector: 'app-day-event-detail',
  templateUrl: './day-event-detail.component.html',
  styleUrls: ['./day-event-detail.component.scss']
})
export class DayEventDetailComponent {

  @Input() events: Event[] = []
  @Output() close = new EventEmitter<void>()

  onClose() {
    this.close.emit()
  }

}
