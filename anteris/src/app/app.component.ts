import {AfterViewChecked, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'Anteris';
  logIn = false;

  ngAfterViewChecked() {
    setTimeout(() => {
      if (JSON.parse(localStorage.getItem('currentUser'))) {
        this.logIn = true;
      } else {
        this.logIn = false;
      }
    });
  }

  ngOnInit() {
    this.title = 'Dashboard';
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.logIn = true;
    } else {
      this.logIn = false;
    }
  }
}
