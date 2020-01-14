import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DonationComponent } from './components/donation/donation.component';
import { VoteComponent } from './components/vote/vote.component';
import { VoteFormComponent } from './components/vote-form/vote-form.component';
import { VoteEditComponent } from './components/vote-edit/vote-edit.component';
import { VoteDetailsComponent } from './components/vote-details/vote-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  { path: 'donation', component: DonationComponent, canActivate: [AuthGuard] },
  { path: 'donation-list', component: DonationComponent, canActivate: [AuthGuard] },

  { path: 'vote', component: VoteComponent, canActivate: [AuthGuard] },
  { path: 'add-vote', component: VoteFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-vote', component: VoteEditComponent, canActivate: [AuthGuard] },
  { path: 'vote-details', component: VoteDetailsComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
