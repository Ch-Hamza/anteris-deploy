import { Component, OnInit, HostListener } from '@angular/core';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-stripe-checkout-handler',
  templateUrl: './stripe-checkout-handler.component.html',
  styleUrls: ['./stripe-checkout-handler.component.css']
})
export class StripeCheckoutHandlerComponent implements OnInit {

  handler: any;
  amount: number = 5;

  constructor(private donationService: DonationService) { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_fLMkFjoVDt7WMvoUbhpGBEe9003H5lO4Kq',
      image: '../../../../assets/uploads/default-user-image.png',
      locale: 'auto',
      token: token => {
        this.donationService.processPayment(token, this.amount).subscribe(data => {
          console.log(data);
        });
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'Anteris',
      description: 'Donate to Anteris',
      amount: this.amount * 100,
    });
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }

}
