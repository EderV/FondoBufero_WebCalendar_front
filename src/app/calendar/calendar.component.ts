import {Component, OnInit} from '@angular/core';
import {EventService} from "../global/services/event.service";

interface CalendarDay {
  isCurrentMonth: boolean
  dayOfMonth: number
  // date: Date
  // dayOfWeek: string
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarDay: CalendarDay[][] = [];
  currentDate: Date = new Date(new Date().getFullYear(), 3);

  constructor(private readonly eventService: EventService) { }

  ngOnInit(): void {
    // this.getEvents('03-06-2022_00:00:00', '04-06-2024_23:59:59')
    this.generateCalendar()
  }

  private getEvents(startDate: string, endDate: string) {
    this.eventService.getEventsBetweenDates(startDate, endDate).subscribe(
      (events) => console.log(events)
    )
  }

  generateCalendar(): void {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    const firstDayOfFirstWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay()
    const lastDayOfLastWeek =  lastDayOfMonth.getDay() === 0 ? 7 : lastDayOfMonth.getDay()

    console.log(firstDayOfFirstWeek)
    console.log(lastDayOfLastWeek)

    const daysInMonth = lastDayOfMonth.getDate();
    const totalDays = firstDayOfFirstWeek + daysInMonth;
    const weeksInMonth = Math.ceil(totalDays / 7);
    console.log(`Weeks in month: ${weeksInMonth}`)

    let dayOfMonth = 0
    for (let week = 1; week <= weeksInMonth; week++) {
      const weekArray: CalendarDay[] = []

      let firstDayOfFirstWeekFound = false
      let lastDayOfLastWeekFound = false

      for (let dayInWeek = 1; dayInWeek <= 7; dayInWeek++) {
        const calendarDay: CalendarDay = {dayOfMonth: dayOfMonth, isCurrentMonth: true}

        if (week === 1) {
          if (dayInWeek === firstDayOfFirstWeek) {
            firstDayOfFirstWeekFound = true
          }
          if (firstDayOfFirstWeekFound) {
            dayOfMonth++
            calendarDay.isCurrentMonth = true
            calendarDay.dayOfMonth = dayOfMonth
          }
          else {
            calendarDay.isCurrentMonth = false
            calendarDay.dayOfMonth = 0
          }
        }
        else if (week === weeksInMonth) {
          if (!lastDayOfLastWeekFound) {
            dayOfMonth++
            calendarDay.isCurrentMonth = true
            calendarDay.dayOfMonth = dayOfMonth
          }
          else {
            calendarDay.isCurrentMonth = false
            calendarDay.dayOfMonth = 0
          }
          if (dayInWeek === lastDayOfLastWeek) {
            lastDayOfLastWeekFound = true
          }
        }
        else {
          dayOfMonth++
          calendarDay.dayOfMonth = dayOfMonth
        }

        weekArray.push(calendarDay)
      }

      this.calendarDay.push(weekArray)
    }

  }

}
