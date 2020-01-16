import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-meeting',
  templateUrl: './display-meeting.component.html',
  styleUrls: ['./display-meeting.component.css']
})
export class DisplayMeetingComponent implements OnInit {

  @Input() meeting;
  currentUserAuthority;
  authorized = false;

  constructor(private loginService: LoginService,
    private meetingService: MeetingService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUserAuthority = this.loginService.currentUserValue.authorities;
    this.checkAuthority();
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

}
