import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { VoteService } from 'src/app/services/vote.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-vote-display',
  templateUrl: './vote-display.component.html',
  styleUrls: ['./vote-display.component.css']
})
export class VoteDisplayComponent implements OnInit {

  @Input() vote;
  currentUserAuthority;
  authorized = false;
  restricted = false;

  constructor(private voteService: VoteService, 
    private confirmationDialogService: ConfirmationDialogService,
    private loginService: LoginService, 
    private toastr: ToastrService) { }

  ngOnInit() {
    //console.log(this.vote)
    this.currentUserAuthority = this.loginService.currentUserValue.authorities;
    this.checkAuthority();
    this.checkRestriction();
    this.checkVoteClosed()
    this.checked_votes();
    this.option_percentage();
  }

  checkAuthority() {
    const checkRoleExistence = roleParam => this.currentUserAuthority.some( ({authority}) => authority == roleParam)
    if(checkRoleExistence('ROLE_ADMIN')) {
      this.authorized = true;
    }
  }

  checkRestriction() {
    const checkRoleExistence = roleParam => this.vote.role_restriction.some((role) => role == roleParam)
    this.currentUserAuthority.forEach(function(role){
      if(checkRoleExistence(role['authority'])) {
        this.restricted = true;
      }
    }.bind(this));
  }

  triggerFunction(vote) {
    vote['closed'] = 'true';
  }

  getDate(val) {
    return new Date(val);
  }

  checkVoteClosed() {
    let vote_end = new Date(this.vote.end_date)
    if (vote_end < new Date()) {
      this.vote['closed'] = 'true';
    }
  }

  checked_votes() {
    let vote_result = this.vote.voteOptionResponses.find(i => i.user_id === this.loginService.currentUserValue.user.id);
    this.vote.vote_options.forEach(function(option){
      if(vote_result && vote_result.id === option.id) {
        option['checked'] = 'true';        
      }
    });
  }

  option_percentage() {
    let total = 0;
    this.vote.vote_options.forEach(function(option){
      total += +option.total_votes
    });
    this.vote.vote_options.forEach(function(option){
      option['percentage'] = 0;
      if(option.total_votes != 0) {
        option['percentage'] = (option.total_votes/total)*100;
      }
    });
  }

  send_vote(option) {
    let voteForm = {vote_option_id: option.id, user_id: this.loginService.currentUserValue.user.id}
    this.voteService.sendVote(voteForm).subscribe(data => {
      console.log(data);
      this.toastr.success('Vote sent successfully!');
    }, error => {
      this.toastr.error('An error has occured!');
    });
  }

  delete() {
    this.voteService.removeById(this.vote.id).subscribe(
      data => {
        this.toastr.success('Vote deleted successfully!');
        //this.router.navigate(['/vote']);
      },
      error => {
        this.toastr.error('An error has occured!');
    });
  }

  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this vote ?', 'OK', 'Cancel', 'lg')
    .then((confirmed) => {
      if(confirmed)
        this.delete();
    });
    //.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
