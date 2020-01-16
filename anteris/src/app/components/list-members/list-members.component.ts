import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.css']
})
export class ListMembersComponent implements OnInit {

  members;
  loaded = false;

  constructor(private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.findAll().subscribe(data => {
      console.log(data);
      this.members = data;
      this.loaded = true;
    });
  }

  delete(id) {
    this.userService.removeById(id).subscribe(data => {
      this.toastr.success('User banned successfully!');
      this.loadData();
    },
    error => {
      this.toastr.error('An error has occured!');
    });
  }

  unban(id) {
    this.userService.unbanById(id).subscribe(data => {
      this.toastr.success('User unbanned successfully!');
      this.loadData();
    },
    error => {
      this.toastr.error('An error has occured!');
    });
  }

}
