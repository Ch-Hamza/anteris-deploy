import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private user: User;

  constructor(public router: Router, private loginService: LoginService) {
    this.loginService.currentUser.subscribe(data => {
      if (data) {
        // @ts-ignore
        this.user = data.user as User;
      }
    });
  }

  ngOnInit() {
  }

}
