import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user;

  constructor(private router: Router,
    private loginService: LoginService) {
    this.loginService.currentUser.subscribe(data => {
      if (data) {
        this.user = data['user'].username
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}