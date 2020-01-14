import { Component, OnInit } from '@angular/core';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {

  donations;

  constructor(private donationService: DonationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.donationService.findAll().subscribe(data => {
      console.log(data);
      this.donations = data;
    });
  }

}
