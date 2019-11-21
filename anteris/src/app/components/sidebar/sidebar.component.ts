import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user;
  constructor(public router: Router,
    private loginService: LoginService) {
    this.loginService.currentUser.subscribe(data => {
      if (data) {
        this.user = data['user'];
      }
    });
  }

  ngOnInit() {
  }

}