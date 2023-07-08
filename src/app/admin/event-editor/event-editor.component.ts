import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../global/services/event.service";
import {Logger} from "../../global/utils/logger";
import {Event} from "../../global/models/Event";
import {EventFormComponent} from "../event-form/event-form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  @ViewChild("eventFormComponent") eventFormComponent!: EventFormComponent

  events: Event[] = []
  overlayWait = false
  currentMonth: string = ''

  private currentDate = new Date()

  constructor(
    private readonly logger: Logger,
    private readonly router: Router,
    private readonly eventService: EventService
  ) { }

  ngOnInit(): void {
    this.overlayWait = true
    this.reloadEvents()
  }

  previousMonth(): void {
    this.overlayWait = true
    this.currentDate.setMonth(this.currentDate.getMonth() - 1)
    this.reloadEvents()
  }

  nextMonth(): void {
    this.overlayWait = true
    this.currentDate.setMonth(this.currentDate.getMonth() + 1)
    this.reloadEvents()
  }

  eventSelected(event: Event) {
    this.eventFormComponent.updateForm(event)
  }

  deleteEvent(event: Event) {
    this.overlayWait = true
    this.eventService.deleteEvent(event).subscribe({
      next: (res) => {
        this.logger.i(`Deleted successfully: ${res}`)
        this.reloadEvents()
        this.overlayWait = false
        this.eventFormComponent.clearForm()
      },
      error: (error) => {
        this.logger.e(error.error)
        if (error.status === 401) {
          this.router.navigate(['/login'])
        }
        this.overlayWait = false
      }
    })
  }

  updateEvent(event: Event) {
    this.overlayWait = true
    this.eventService.updateEvent(event).subscribe({
      next: (res) => {
        this.logger.i(`Updated successfully: ${res}`)
        this.reloadEvents()
        this.overlayWait = false
      },
      error: (error) => {
        this.logger.e(error.error)
        if (error.status === 401) {
          this.router.navigate(['/login'])
        }
        this.overlayWait = false
      }
    })
  }

  private reloadEvents(): void {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    const firstDayOfMonthString = this.formatDate(firstDayOfMonth) + '_00:00:00'
    const lastDayOfMonthString = this.formatDate(lastDayOfMonth) + '_23:59:59'

    this.getEvents(firstDayOfMonthString, lastDayOfMonthString)
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por eso se suma 1
    const year = date.getFullYear();

    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    return (`${formattedDay}-${formattedMonth}-${year}`);
  }

  private getEvents(startDate: string, endDate: string) {
    this.eventService.getEventsBetweenDates(startDate, endDate).subscribe({
      next: (events) => {
        this.events = events

        console.log(events)

        this.currentMonth = this.currentDate.toLocaleString('en-GB', { month: 'long' });

        this.overlayWait = false
      },
      error: (error) => {
        this.logger.e(`Failed getting events. ${error}`)
        this.overlayWait = false
      }
    })
  }

}
