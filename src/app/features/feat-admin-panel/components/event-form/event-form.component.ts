import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MtxCalendarView, MtxDatetimepickerMode, MtxDatetimepickerType} from "@ng-matero/extensions/datetimepicker";
import {Logger} from "../../../../core/utils/logger";
import {Router} from "@angular/router";
import {EventService} from "../../../../core/services/event.service";
import {Event} from "../../../../core/models/Event";
import {FileLogosService} from "../../../../core/services/file-logos.service";

const initEvent: Event = {
  id: '',
  title: '',
  description: '',
  owner: '',
  logo: '',
  date: undefined,
  duration: 0,
  type: '',
  link: '',
  canceled: false,
  cancelReason: '',
  createdAt: undefined
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
  overlayWait = false

  type: MtxDatetimepickerType = 'datetime';
  mode: MtxDatetimepickerMode = 'portrait';
  startView: MtxCalendarView = 'month';
  multiYearSelector = false;
  touchUi = false;
  twelvehour = false;
  timeInterval = 1;
  timeInput = true;

  eventTypes: string[] = ['Game', 'Event', 'Podcast', 'Vote', 'Polkadot event']
  logosNames: string[] = []

  constructor(
    private readonly logger: Logger,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly fileLogosService: FileLogosService,
    private readonly eventService: EventService
  ) { }

  ngOnInit() {
    this.getLogosList()
    this.updateForm(initEvent)
  }

  submitForm(): void {
    console.log(this.eventForm.get('date')?.value)

    if (this.eventForm.valid) {
      const event = this.eventForm.value as Event

      // if (event.date !== undefined) {
      //   event.date = new Date(event.date.getTime() - event.date.getTimezoneOffset() * 60000)
      // }

      this.logger.i(event)

      this.submitEvent.emit(event)
    }
  }

  clearForm() {
    this.updateForm(initEvent)
  }

  updateForm(event: Event) {
    this.eventForm = this.initForm(event)
  }

  private getLogosList() {
    this.overlayWait = true
    this.fileLogosService.getLogosNames().subscribe({
      next: (logosNames) => {
        this.logosNames = logosNames

        this.overlayWait = false
      },
      error: (error) => {
        this.logger.e(error)
        this.overlayWait = false
      }
    })
  }

  private initForm(event: Event): FormGroup {
    return this.formBuilder.group({
      id: event.id,
      title: event.title,
      description: event.description,
      owner: event.owner,
      logo: event.logo,
      date: event.date,
      duration: event.duration,
      type: event.type,
      link: event.link,
      canceled: [`${event.canceled}`],
      cancelReason: event.cancelReason
    })
  }

}
