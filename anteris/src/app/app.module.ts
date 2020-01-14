import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountdownTimerModule } from 'angular-countdown-timer';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
import { AuthInterceptor } from './guards/auth-interceptor';
import { VoteDisplayComponent } from './components/vote-display/vote-display.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { VoteEditComponent } from './components/vote-edit/vote-edit.component';

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
    VoteDisplayComponent,
    ConfirmationDialogComponent,
    VoteEditComponent,
  ],
  entryComponents: [ConfirmationDialogComponent],
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
    CountdownTimerModule.forRoot(),
    MatProgressBarModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
