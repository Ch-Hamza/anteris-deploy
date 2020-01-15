import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/layout-components/home/home.component';
import { LoginComponent } from './components/login-register-components/login/login.component';
import { RegisterComponent } from './components/login-register-components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DonationComponent } from './components/donation-components/donation/donation.component';
import { VoteComponent } from './components/vote-components/vote/vote.component';
import { VoteFormComponent } from './components/vote-components/vote-form/vote-form.component';
import {UserListComponent} from './components/user-crud-components/user-list/user-list.component';
import { ListMembersComponent } from './components/list-members/list-members.component';
import { EditMemberComponent } from './components/edit-member/edit-member.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { VoteEditComponent } from './components/vote-edit/vote-edit.component';
import { VoteDetailsComponent } from './components/vote-components/vote-details/vote-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'donation', component: DonationComponent, canActivate: [AuthGuard] },
  { path: 'donation-list', component: DonationListComponent, canActivate: [AuthGuard] },
  { path: 'vote', component: VoteComponent, canActivate: [AuthGuard] },
  { path: 'add-vote', component: VoteFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-vote/:id', component: VoteEditComponent, canActivate: [AuthGuard] },
  { path: 'vote-details/:id', component: VoteDetailsComponent, canActivate: [AuthGuard] },
  { path: 'users-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'member', component: ListMembersComponent, canActivate: [AuthGuard] },
  { path: 'edit-member/:id', component: EditMemberComponent, canActivate: [AuthGuard] },
  { path: 'add-member', component: RegisterComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
