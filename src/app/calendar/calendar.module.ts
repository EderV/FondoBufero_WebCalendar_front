import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { DayEventComponent } from './day-event/day-event.component';
import { OverlayLoadingComponent } from "../global/components/overlay-loading/overlay-loading.component";


@NgModule({
  declarations: [
    CalendarComponent,
    DayEventComponent,
    OverlayLoadingComponent
  ],
  imports: [
      CommonModule,
      CalendarRoutingModule
  ],
  exports: [
    OverlayLoadingComponent
  ]
})
export class CalendarModule { }
