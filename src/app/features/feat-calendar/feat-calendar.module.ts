import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayEventComponent } from './components/calendar/day-event/day-event.component';
import { OverlayLoadingComponent } from "../../core/components/overlay-loading/overlay-loading.component";
import { DayEventDetailComponent } from './components/day-event-detail/day-event-detail.component';
import {MatTabsModule} from "@angular/material/tabs";
import {FeatCalendarComponent} from "./feat-calendar.component";
import {CalendarRoutingModule} from "./feat-calendar-routing.module";
import {CalendarComponent} from "./components/calendar/calendar.component";
import { CarouselComponent } from './components/carousel/carousel.component';


@NgModule({
  declarations: [
    FeatCalendarComponent,
    DayEventComponent,
    OverlayLoadingComponent,
    DayEventDetailComponent,
    CalendarComponent,
    CarouselComponent
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
export class FeatCalendarModule { }
