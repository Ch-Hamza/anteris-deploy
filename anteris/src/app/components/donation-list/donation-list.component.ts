import { Component, OnInit } from '@angular/core';
import { DonationService } from 'src/app/services/donation.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {

  donations;
  donation_stats;
  loaded = false;

  constructor(private donationService: DonationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let donations = this.donationService.findAll();
    let stats = this.donationService.findStats();
    forkJoin([donations, stats]).subscribe(results => {
      this.donations = results[0];
      this.donation_stats = results[1];
      this.loaded = true;
      //console.log(this.donations);
      //console.log(this.donation_stats);
    });
  }

}
