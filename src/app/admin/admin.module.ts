import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MatTabsModule} from "@angular/material/tabs";
import { AddEventComponent } from './add-event/add-event.component';
import { EventEditorComponent } from './event-editor/event-editor.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MtxDatetimepickerModule} from "@ng-matero/extensions/datetimepicker";
import {MtxNativeDatetimeModule} from "@ng-matero/extensions/core";
import { EventViewComponent } from './event-editor/event-view/event-view.component';
import {MatCardModule} from "@angular/material/card";
import { EventFormComponent } from './event-form/event-form.component';
import {MatIconModule} from "@angular/material/icon";
import {CalendarModule} from "../calendar/calendar.module";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { UploadImageComponent } from './upload-image/upload-image.component';


@NgModule({
  declarations: [
    AdminComponent,
    AddEventComponent,
    EventEditorComponent,
    EventViewComponent,
    EventFormComponent,
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MtxDatetimepickerModule,
    MtxNativeDatetimeModule,
    MatCardModule,
    MatIconModule,
    CalendarModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class AdminModule { }
