import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AddEventComponent} from "./add-event/add-event.component";
import {EventEditorComponent} from "./event-editor/event-editor.component";
import {UploadImageComponent} from "./upload-image/upload-image.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
