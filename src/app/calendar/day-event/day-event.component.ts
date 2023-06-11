import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-day-event',
  templateUrl: './day-event.component.html',
  styleUrls: ['./day-event.component.scss']
})
export class DayEventComponent {

  @Input() dayNumber!: number
  @Input() eventTitles!: string[]

}
