import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeatAdminComponent} from "./feat-admin.component";

const routes: Routes = [
  {
    path: '', component: FeatAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatAdminRoutingModule { }
