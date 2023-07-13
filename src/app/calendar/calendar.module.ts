import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { DayEventComponent } from './day-event/day-event.component';
import { OverlayLoadingComponent } from "../global/components/overlay-loading/overlay-loading.component";
import { DayEventDetailComponent } from './day-event-detail/day-event-detail.component';
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [
    CalendarComponent,
    DayEventComponent,
    OverlayLoadingComponent,
    DayEventDetailComponent
  ],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        MatTabsModule
    ],
  exports: [
    OverlayLoadingComponent
  ]
})
export class CalendarModule { }
