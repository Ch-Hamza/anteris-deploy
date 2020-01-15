import { Component, OnInit } from '@angular/core';
import { VoteService } from 'src/app/services/vote.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  votes;

  constructor(private voteService: VoteService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.voteService.findAll().subscribe(data => {
      console.log(data)
      this.votes = data;
    });
  }
}
