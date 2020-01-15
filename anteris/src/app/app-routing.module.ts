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


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'donation', component: DonationComponent, canActivate: [AuthGuard] },
  { path: 'vote', component: VoteComponent, canActivate: [AuthGuard] },
  { path: 'add-vote', component: VoteFormComponent, canActivate: [AuthGuard] },
  { path: 'users-list', component: UserListComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
