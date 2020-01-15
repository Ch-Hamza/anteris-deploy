import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoteService } from 'src/app/services/vote.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-vote-details',
  templateUrl: './vote-details.component.html',
  styleUrls: ['./vote-details.component.css']
})
export class VoteDetailsComponent implements OnInit {

  vote;
  loaded = false;
  currentUserAuthority;
  authorized = false;
  
  constructor(private route: ActivatedRoute,
    private voteService: VoteService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      this.voteService.findById(params['id']).subscribe(data => {
        console.log(data);
        this.vote = data;
        this.currentUserAuthority = this.loginService.currentUserValue.authorities;
        this.checkVoteClosed();
        this.checkAuthority();
        this.option_percentage();
        this.loaded = true;
      })
    });
  }

  checkAuthority() {
    const checkRoleExistence = roleParam => this.currentUserAuthority.some( ({authority}) => authority == roleParam)
    if(checkRoleExistence('ROLE_ADMIN')) {
      this.authorized = true;
    }
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

}
