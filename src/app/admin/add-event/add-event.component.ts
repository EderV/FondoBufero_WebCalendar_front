import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MtxCalendarView, MtxDatetimepickerMode, MtxDatetimepickerType} from "@ng-matero/extensions/datetimepicker";
import {Event} from "../../global/models/Event";
import {EventService} from "../../global/services/event.service";
import {Router} from "@angular/router";
import {Logger} from "../../global/utils/logger";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor(
    private readonly logger: Logger,
    private readonly eventService: EventService
  ) { }

  ngOnInit(): void {

  }

  submitForm(event: Event): void {
    this.eventService.saveEvent(event).subscribe({
      next: (success) => console.log(`Successfully saved event: ${success}`),
      error: (error) => this.logger.e(error.error)
    })
  }

}
