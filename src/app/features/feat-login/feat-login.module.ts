import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FeatLoginComponent} from "./feat-login.component";
import {LoginRoutingModule} from "./feat-login-routing.module";


@NgModule({
  declarations: [
    FeatLoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class FeatLoginModule { }
