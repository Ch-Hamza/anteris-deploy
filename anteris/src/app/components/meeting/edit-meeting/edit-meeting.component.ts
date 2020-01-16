import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MeetingService } from 'src/app/services/meeting.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.css']
})
export class EditMeetingComponent implements OnInit {

  editMeeting: FormGroup;
  meeting;
  selectedFile;
  loaded = false;
  users_loaded = false;

  dropdownListMembers = [];

  constructor(private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private uploadService: UploadFileService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      this.meetingService.findById(params['id']).subscribe(data => {
        this.meeting = data;
        this.selectedFile = this.meeting.record_file;
        this.initForm();
        this.loaded = true;
      })
    });

    this.userService.findAll().subscribe((data:any) => {
      data = data.map(user => { return { fullname: user.firstname + ' ' + user.lastname, id: user.id } });
      this.dropdownListMembers = data
      console.log(data);
      this.users_loaded = true;
    });
  }

  initForm() {
    this.editMeeting = this.formBuilder.group({
      title: [this.meeting.title, Validators.required],
      description: [this.meeting.description, Validators.required],
      meeting_date: [this.meeting.meeting_date],
      user_ids: [this.meeting.user_ids],
      record_file: []
    });
  }

  get f() {
    return this.editMeeting.controls;
  }

  upload_record(meeting_id) {
    this.uploadService.pushFilesToStorage(this.selectedFile, meeting_id).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log(event.body);
      }
    });
  }

  fileChange(value) {
    //console.log(value.target.files[0]);
    this.selectedFile = value.target.files[0];
  }

  onSubmit() {
    console.log(this.editMeeting.value);
    this.editMeeting.addControl('id', new FormControl(this.meeting.id));
    // stop here if form is invalid
    if (this.editMeeting.invalid) {
      return;
    }

    this.meetingService
      .updateMeeting(this.editMeeting.value)
      .subscribe(
        (data: any) => {

          if(this.selectedFile != this.meeting.record_file) {
            console.log(this.meeting.record_file);
            this.upload_record(this.meeting.id);
          }

          this.toastr.success('Meeting edited successfully!');
          //console.log(data);
          this.router.navigate(['/meeting']);
        },
        error => {
          this.toastr.error('An error has occured!');
        }
    );
  }

}
