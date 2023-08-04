import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeatLoginComponent} from "./feat-login.component";

const routes: Routes = [
  { path: '', component: FeatLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
