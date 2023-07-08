import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./global/interceptors/auth.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './global/components/page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
