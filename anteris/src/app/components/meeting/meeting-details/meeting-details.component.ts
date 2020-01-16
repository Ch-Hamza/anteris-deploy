import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {

  meeting;
  invited_users = [];
  loaded = false;
  currentUserAuthority;
  authorized = false;
  
  constructor(private route: ActivatedRoute,
    private meetingService: MeetingService,
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      this.meetingService.findById(params['id']).subscribe(data => {
        console.log(data);
        this.meeting = data;
        this.currentUserAuthority = this.loginService.currentUserValue.authorities;
        this.checkAuthority();
        this.meeting.user_ids.forEach(user_id => {
          this.userService.findById(user_id.id).subscribe((data:any) => {
            this.invited_users.push(data.firstname + ' ' + data.lastname);
          });
        });
        console.log(this.invited_users)
        this.loaded = true;
      })
    });
  }

  checkAuthority() {
    const checkRoleExistence = roleParam => this.currentUserAuthority.some( ({authority}) => authority == roleParam)
    if(checkRoleExistence('ROLE_ADMIN')) {
      this.authorized = true;
    }
  }

  getDate(val) {
    return new Date(val);
  }

  delete() {
    this.meetingService.removeById(this.meeting.id).subscribe(
      data => {
        this.toastr.success('Meeting deleted successfully!');
      },
      error => {
        this.toastr.error('An error has occured!');
    });
  }

  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this meeting ?', 'OK', 'Cancel', 'lg')
    .then((confirmed) => {
      if(confirmed)
        this.delete();
    });
    //.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  download() {
    let url = decodeURI("/assets/uploads/" + this.meeting.record_file);
    window.open(url.trim(), "_blank");
  }
}
