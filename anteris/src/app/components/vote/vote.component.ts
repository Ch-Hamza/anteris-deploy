import { Component, OnInit } from '@angular/core';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  votes;

  constructor(private voteService: VoteService) { }

  ngOnInit() {
    this.voteService.findAll().subscribe(data => {
      this.votes = data;
    })
  }

}
