import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login-register-components/login/login.component';
import { RegisterComponent } from './components/login-register-components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DonationComponent } from './components/donation-components/donation/donation.component';
import { VoteComponent } from './components/vote-components/vote/vote.component';
import { VoteFormComponent } from './components/vote-components/vote-form/vote-form.component';
import {UserListComponent} from './components/user-crud-components/user-list/user-list.component';
import { ListMembersComponent } from './components/member/list-members/list-members.component';
import { EditMemberComponent } from './components/member/edit-member/edit-member.component';
import { DonationListComponent } from './components/donation-components/donation-list/donation-list.component';
import { VoteEditComponent } from './components/vote-components/vote-edit/vote-edit.component';
import { VoteDetailsComponent } from './components/vote-components/vote-details/vote-details.component';
import { AddMemberComponent } from './components/member/add-member/add-member.component';
import { ListMeetingsComponent } from './components/meeting/list-meetings/list-meetings.component';
import { AddMeetingComponent } from './components/meeting/add-meeting/add-meeting.component';
import { EditMeetingComponent } from './components/meeting/edit-meeting/edit-meeting.component';
import { MeetingDetailsComponent } from './components/meeting/meeting-details/meeting-details.component';
import {WelcomeComponent} from './components/welcome/welcome.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard]},
  { path: 'pending/:id', component: RegisterComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  { path: 'donation', component: DonationComponent, canActivate: [AuthGuard] },
  { path: 'donation-list', component: DonationListComponent, canActivate: [AuthGuard] },

  { path: 'vote', component: VoteComponent, canActivate: [AuthGuard] },
  { path: 'add-vote', component: VoteFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-vote/:id', component: VoteEditComponent, canActivate: [AuthGuard] },
  { path: 'vote-details/:id', component: VoteDetailsComponent, canActivate: [AuthGuard] },

  { path: 'meeting', component: ListMeetingsComponent, canActivate: [AuthGuard] },
  { path: 'add-meeting', component: AddMeetingComponent, canActivate: [AuthGuard] },
  { path: 'edit-meeting/:id', component: EditMeetingComponent, canActivate: [AuthGuard] },
  { path: 'meeting-details/:id', component: MeetingDetailsComponent, canActivate: [AuthGuard] },

  { path: 'users-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'member', component: ListMembersComponent, canActivate: [AuthGuard] },
  { path: 'edit-member/:id', component: EditMemberComponent, canActivate: [AuthGuard] },
  { path: 'add-member', component: AddMemberComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
