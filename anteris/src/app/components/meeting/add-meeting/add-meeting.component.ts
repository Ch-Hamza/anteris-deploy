import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeetingService } from 'src/app/services/meeting.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {

  addMeeting: FormGroup;
  loaded = false;

  dropdownListMembers = [];

  constructor(private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.loadData();
    this.initForm();
  }

  loadData() {
    this.userService.findAll().subscribe((data:any) => {
      data = data.map(user => { return { fullname: user.firstname + ' ' + user.lastname, id: user.id } });
      this.dropdownListMembers = data
      console.log(data);
      this.loaded = true;
    });
    
  }

  initForm() {
    this.addMeeting = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      meeting_date: [],
      user_ids: [[]],
    });
  }

  get f() {
    return this.addMeeting.controls;
  }

  onSubmit() {
    console.log(this.addMeeting.value);

    // stop here if form is invalid
    if (this.addMeeting.invalid) {
      return;
    }

    this.meetingService
      .newmeeting(this.addMeeting.value)
      .subscribe(
        (data: any) => {
          this.toastr.success('Meeting added successfully!');
          //console.log(data);
          this.router.navigate(['/meeting']);
        },
        error => {
          this.toastr.error('An error has occured!');
        }
    );
  }

}
