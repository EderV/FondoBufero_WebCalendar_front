import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatAdminRoutingModule } from './feat-admin-routing.module';
import { FeatAdminComponent } from './feat-admin.component';
import {MatTabsModule} from "@angular/material/tabs";
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MtxDatetimepickerModule} from "@ng-matero/extensions/datetimepicker";
import {MtxNativeDatetimeModule} from "@ng-matero/extensions/core";
import { EventViewComponent } from './components/event-editor/event-view/event-view.component';
import {MatCardModule} from "@angular/material/card";
import { EventFormComponent } from './components/event-form/event-form.component';
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import {CalendarModule} from "../feat-calendar/feat-calendar.module";


@NgModule({
  declarations: [
    FeatAdminComponent,
    AddEventComponent,
    EventEditorComponent,
    EventViewComponent,
    EventFormComponent,
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    FeatAdminRoutingModule,
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
export class FeatAdminModule { }
