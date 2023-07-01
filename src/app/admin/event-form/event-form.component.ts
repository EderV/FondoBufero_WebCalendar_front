import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MtxCalendarView, MtxDatetimepickerMode, MtxDatetimepickerType} from "@ng-matero/extensions/datetimepicker";
import {Logger} from "../../global/utils/logger";
import {Router} from "@angular/router";
import {EventService} from "../../global/services/event.service";
import {Event} from "../../global/models/Event";
import {MTX_DATETIME_FORMATS} from "@ng-matero/extensions/core";

const initEvent: Event = {
  id: '',
  title: '',
  description: '',
  owner: '',
  logo: '',
  date: new Date(0),
  duration: 0,
  type: '',
  link: '',
  canceled: false,
  cancelReason: '',
  createdAt: new Date(0)
}

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  @Input() fullForm = false
  @Output() submitEvent = new EventEmitter<Event>()

  eventForm!: FormGroup;

  type: MtxDatetimepickerType = 'datetime';
  mode: MtxDatetimepickerMode = 'portrait';
  startView: MtxCalendarView = 'month';
  multiYearSelector = false;
  touchUi = false;
  twelvehour = false;
  timeInterval = 1;
  timeInput = true;

  constructor(
    private readonly logger: Logger,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly eventService: EventService
  ) { }

  ngOnInit() {
    this.updateForm(initEvent)
  }

  submitForm(): void {
    const event = this.eventForm.value as Event
    event.date = new Date(event.date.getTime() - event.date.getTimezoneOffset() * 60000)

    this.logger.i(event)

    this.submitEvent.emit(event)
  }

  updateForm(event: Event) {
    this.eventForm = this.initForm(event)
  }

  private initForm(event: Event): FormGroup {
    return this.formBuilder.group({
      title: event.title,
      description: event.description,
      owner: event.owner,
      logo: event.logo,
      date: event.date,
      duration: event.duration,
      type: event.type,
      link: event.link,
      cancelReason: event.cancelReason
    })
  }

}
