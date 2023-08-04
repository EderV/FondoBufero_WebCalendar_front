import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeatCalendarComponent} from "./feat-calendar.component";

const routes: Routes = [
  {path: '', component: FeatCalendarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
