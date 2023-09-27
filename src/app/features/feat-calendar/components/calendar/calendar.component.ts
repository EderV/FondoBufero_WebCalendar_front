import {Component, OnInit} from '@angular/core';
import {Event} from "../../../../core/models/Event";
import {EventService} from "../../../../core/services/event.service";

interface CalendarDay {
  isCurrentMonth: boolean
  dayOfMonth: number
  events: Event[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  calendarDay: CalendarDay[][] = []
  allEventsInMonth: Event[] = []
  currentDate: Date = new Date()
  currentMonth: string = ''

  weekDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  overlayWait = false
  errorReachingData = false

  showDayDetailPopUp = false
  eventsDetail: Event[] = []

  constructor(private readonly eventService: EventService) { }

  ngOnInit(): void {
    this.overlayWait = true
    this.updateCalendar()
  }

  reload(): void {
    this.overlayWait = true
    this.currentDate = new Date()
    this.updateCalendar()
  }

  previousMonth(): void {
    this.overlayWait = true
    this.currentDate.setMonth(this.currentDate.getMonth() - 1)
    this.updateCalendar()
  }

  nextMonth(): void {
    this.overlayWait = true
    this.currentDate.setMonth(this.currentDate.getMonth() + 1)
    this.updateCalendar()
  }

  onDayClicked(events: Event[]): void {
    if (events.length !== 0) {
      this.showDayDetailPopUp = true
      this.eventsDetail = events
    }
  }

  onPopupDayEventDetailClose(): void {
    this.showDayDetailPopUp = false
    this.eventsDetail = []
  }

  private updateCalendar(): void {
    const firstDayOfMonth = this.getFirstDayOfMonth(this.currentDate)
    const lastDayOfMonth = this.getLastDayOfMonth(this.currentDate)

    const firstDayOfMonthString = this.formatDate(firstDayOfMonth) + '_00:00:00'
    const lastDayOfMonthString = this.formatDate(lastDayOfMonth) + '_23:59:59'

    this.getEvents(firstDayOfMonthString, lastDayOfMonthString)
  }

  private getEvents(startDate: string, endDate: string) {
    this.eventService.getEventsBetweenDates(startDate, endDate).subscribe({
      next: (events) => {
        this.allEventsInMonth = events
        console.log('Events:')
        console.log(this.allEventsInMonth)

        this.currentMonth = this.currentDate.toLocaleString('en-GB', { month: 'long' });
        this.calendarDay = []
        this.generateCalendar()

        this.errorReachingData = false
        this.overlayWait = false
      },
      error: (error) => {
        console.log(`Failed getting events. ${error}`)

        this.errorReachingData = true
        this.overlayWait = false
      }
    })
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por eso se suma 1
    const year = date.getFullYear();

    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    return (`${formattedDay}-${formattedMonth}-${year}`);
  }

  private generateCalendar(): void {
    const firstDayOfMonth = this.getFirstDayOfMonth(this.currentDate)
    const lastDayOfMonth = this.getLastDayOfMonth(this.currentDate)

    let dayIndex = firstDayOfMonth;

    const firstDayOfFirstWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay()
    const lastDayOfLastWeek = lastDayOfMonth.getDay() === 0 ? 7 : lastDayOfMonth.getDay()

    console.log(firstDayOfFirstWeek)
    console.log(lastDayOfLastWeek)

    const daysInMonth = lastDayOfMonth.getDate();

    const totalDays = daysInMonth + firstDayOfFirstWeek + (6 - lastDayOfLastWeek);

    const weeksInMonth = Math.ceil(totalDays / 7);

    let dayOfMonth = 0
    for (let week = 1; week <= weeksInMonth; week++) {
      const weekArray: CalendarDay[] = []

      for (let dayInWeek = 1; dayInWeek <= 7; dayInWeek++) {
        const calendarDay: CalendarDay = {
          dayOfMonth: dayOfMonth,
          isCurrentMonth: true,
          events: []
        };

        if ((week === 1 && dayInWeek < firstDayOfFirstWeek) ||
          (week === weeksInMonth && dayInWeek > lastDayOfLastWeek)
        ) {
          calendarDay.isCurrentMonth = false;
          calendarDay.dayOfMonth = 0;
        } else {
          dayOfMonth++;
          calendarDay.dayOfMonth = dayOfMonth;
          calendarDay.events = this.allEventsInMonth.filter((event: Event) => {
            if (event.date === null || event.date === undefined) {
              return false
            }
            else {
              return (event.date.getDate() === dayIndex.getDate() &&
                event.date.getMonth() === dayIndex.getMonth() &&
                event.date.getFullYear() === dayIndex.getFullYear())
            }
          })

          dayIndex.setDate(dayIndex.getDate() + 1);
        }

        weekArray.push(calendarDay);
      }

      this.calendarDay.push(weekArray)
    }
  }

  private getFirstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private getLastDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

}
