import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})
export class StripeCheckoutComponent implements AfterViewInit {

  @Input() amount: number = 2;
  @Input() label: string = 'test';

  elements: any;
  paymentRequest: any;
  prButton: any;

  @ViewChild('payElement', {static: false}) payElement;

  constructor(private donationService: DonationService) { }

  ngAfterViewInit() {

    // init payment request object
    this.paymentRequest = this.donationService.stripe.paymentRequest({
      country: 'FR',
      currency: 'eur',
      total: {
        amount: this.amount,
        label: this.label
      },
    });

    //init ui components
    this.elements = this.donationService.stripe.elements();

    // register listener
    this.paymentRequest.on('source', async (event) => {
      console.log(event);
      //save details to db
    });

    //create button ui
    this.prButton = this.elements.create('paymentRequestButton', {
      paymentRequest: this.paymentRequest,
      style: {
        paymentRequestButton: {
          type: 'donate',
          theme: 'dark'
        }
      }
    });

    //mount the button asynchronously
    this.mountButton();
  }

  async mountButton() {
    const result = await this.paymentRequest.canMakePayment();
    
    if(result) {
      this.prButton.mount(this.payElement.nativeElement);
    } else {
      console.error('your browser is too old!!');
    }
  }

}
