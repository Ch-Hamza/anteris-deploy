import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  api = 'http://localhost:8080';
  stripe = Stripe('pk_test_fLMkFjoVDt7WMvoUbhpGBEe9003H5lO4Kq');

  constructor(private http: HttpClient) { }

  processPayment(token: any, amount) {
    console.log(token);
    //save to db
  }
}
