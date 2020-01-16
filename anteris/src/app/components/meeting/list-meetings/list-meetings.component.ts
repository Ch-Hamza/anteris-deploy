import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/services/meeting.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-list-meetings',
  templateUrl: './list-meetings.component.html',
  styleUrls: ['./list-meetings.component.css']
})
export class ListMeetingsComponent implements OnInit {

  meetings;
  loaded = false;

  constructor(private meetingService: MeetingService,
    private loginService: LoginService) { }

  ngOnInit() {
    let id = this.loginService.currentUserValue.user.id
    this.loadData(id);
  }

  loadData(id) {
    this.meetingService.findAll(id).subscribe(data => {
      console.log(data);
      this.meetings = data;
      this.loaded = true;
    });
  }

}
