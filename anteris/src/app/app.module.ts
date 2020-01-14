import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { DonationComponent } from './components/donation/donation.component';
import { StripeCheckoutComponent } from './components/stripe-checkout/stripe-checkout.component';
import { StripeCheckoutHandlerComponent } from './components/stripe-checkout-handler/stripe-checkout-handler.component';
import { VoteComponent } from './components/vote/vote.component';
import { VoteDetailsComponent } from './components/vote-details/vote-details.component';
import { VoteFormComponent } from './components/vote-form/vote-form.component';
import {AuthInterceptor, httpInterceptorProviders} from './guards/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    DonationComponent,
    StripeCheckoutComponent,
    StripeCheckoutHandlerComponent,
    VoteComponent,
    VoteDetailsComponent,
    VoteFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: AuthInterceptor, useClass: AuthInterceptor },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
