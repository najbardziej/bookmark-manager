import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule, IconsModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IconsModule,
    MDBBootstrapModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,
              LoginComponent,
              RegisterComponent
  ]
})
export class AppModule { }
