import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  api = 'http://54.36.182.216:8085/donation/';
  stripe = Stripe('pk_test_fLMkFjoVDt7WMvoUbhpGBEe9003H5lO4Kq');

  constructor(private http: HttpClient, private loginService: LoginService) { }

  processPayment(token: any, amount) {
    console.log(token);
    let donation = {'amount': amount, 'user_id': JSON.parse(localStorage.getItem('currentUser')).user.id}
    return this.http.post(this.api, donation);
  }

  findAll() {
    return this.http.get(this.api);
  }

  findById(id) {
    return this.http.get(this.api + id);
  }

  findByUserId(id) {
    return this.http.get(this.api + 'user/' + id);
  }

  findStats() {
    return this.http.get(this.api + 'stats');
  }
}
