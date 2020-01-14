import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-vote-details',
  templateUrl: './vote-details.component.html',
  styleUrls: ['./vote-details.component.css']
})
export class VoteDetailsComponent implements OnInit {

  vote;
  
  constructor(private route: ActivatedRoute,
    private voteService: VoteService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      this.voteService.findById(params['id']).subscribe(data => {
        this.vote = data;
      })
    });
  }

}
