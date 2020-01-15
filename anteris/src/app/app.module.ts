import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CountdownTimerModule } from 'angular-countdown-timer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login-register-components/login/login.component';
import { HomeComponent } from './components/layout-components/home/home.component';
import { NavbarComponent } from './components/layout-components/navbar/navbar.component';
import { SidebarComponent } from './components/layout-components/sidebar/sidebar.component';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { RegisterComponent } from './components/login-register-components/register/register.component';
import { DonationComponent } from './components/donation-components/donation/donation.component';
import { StripeCheckoutComponent } from './components/donation-components/stripe-checkout/stripe-checkout.component';
import { StripeCheckoutHandlerComponent } from './components/donation-components/stripe-checkout-handler/stripe-checkout-handler.component';
import { VoteComponent } from './components/vote-components/vote/vote.component';
import { VoteDetailsComponent } from './components/vote-components/vote-details/vote-details.component';
import { VoteFormComponent } from './components/vote-components/vote-form/vote-form.component';
import {AuthInterceptor, httpInterceptorProviders} from './guards/auth-interceptor';
import {UserListComponent} from './components/user-crud-components/user-list/user-list.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { VoteEditComponent } from './components/vote-edit/vote-edit.component';
import { ListMembersComponent } from './components/list-members/list-members.component';
import { EditMemberComponent } from './components/edit-member/edit-member.component';
import { VoteDisplayComponent } from './components/vote-display/vote-display.component';

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
    UserListComponent,
    DonationListComponent,
    VoteEditComponent,
    ListMembersComponent,
    EditMemberComponent,
    VoteDisplayComponent,
    VoteDetailsComponent,
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
    MatProgressBarModule,
    CountdownTimerModule.forRoot()
  ],
  providers: [
    { provide: AuthInterceptor, useClass: AuthInterceptor },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
