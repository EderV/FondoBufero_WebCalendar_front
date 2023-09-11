import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import {NgOptimizedImage} from "@angular/common";
import { FeatAboutComponent } from './features/feat-about/feat-about.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        FeatAboutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgOptimizedImage
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
