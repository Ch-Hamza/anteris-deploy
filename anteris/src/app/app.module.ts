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
import { LoginComponent } from './components/login-register-components/login/login.component';
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
import { AuthInterceptor, httpInterceptorProviders } from './guards/auth-interceptor';
import { UserListComponent } from './components/user-crud-components/user-list/user-list.component';
import { DonationListComponent } from './components/donation-components/donation-list/donation-list.component';
import { VoteEditComponent } from './components/vote-components/vote-edit/vote-edit.component';
import { ListMembersComponent } from './components/member/list-members/list-members.component';
import { EditMemberComponent } from './components/member/edit-member/edit-member.component';
import { VoteDisplayComponent } from './components/vote-components/vote-display/vote-display.component';
import { MatProgressBarModule } from '@angular/material';
import { CountdownTimerModule } from 'angular-countdown-timer';
import { ClipboardModule } from 'ngx-clipboard';
import { AddMemberComponent } from './components/member/add-member/add-member.component';
import { ListMeetingsComponent } from './components/meeting/list-meetings/list-meetings.component';
import { AddMeetingComponent } from './components/meeting/add-meeting/add-meeting.component';
import { EditMeetingComponent } from './components/meeting/edit-meeting/edit-meeting.component';
import { DisplayMeetingComponent } from './components/meeting/display-meeting/display-meeting.component';
import { MeetingDetailsComponent } from './components/meeting/meeting-details/meeting-details.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
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
    AddMemberComponent,
    ListMeetingsComponent,
    AddMeetingComponent,
    EditMeetingComponent,
    DisplayMeetingComponent,
    MeetingDetailsComponent,
    WelcomeComponent,
    ConfirmationDialogComponent
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
    ClipboardModule,
    CountdownTimerModule.forRoot()
  ],
  providers: [
    { provide: AuthInterceptor, useClass: AuthInterceptor },
    httpInterceptorProviders,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
