import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {HumanManagementService} from '../../../services/humanManagement.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  roleForm: FormGroup;
  users: User[];
  editMode = false;
  selectedUser: User;
  dropdownListRoles = [
    'ROLE_ADMIN',
    'ROLE_USER',
    'ROLE_'
  ];

  constructor(private formBuilder: FormBuilder,
              private humanManagement: HumanManagementService,
              private toastr: ToastrService) {
  }

  initForm() {
    this.roleForm = this.formBuilder.group({
    role: [this.selectedUser.roles]
  });
}
  ngOnInit() {
    this.humanManagement.findAll().subscribe(
      (data) =>  this.users = data as User[],
      () => this.toastr.error('An error has occured!'));
  }

  addUser() {
    this.users.push(this.users[0]);
  }

  changeRoles(user, i) {
    this.selectedUser = user;
    this.initForm();
    this.editMode = true;
  }

  saveChanges() {
    // validation step and done !!
    if (this.roleForm.value.role.length === 0) {
     this.toastr.error('User mus have a role !');
    } else {
      this.selectedUser.roles = this.roleForm.value.role;
      this.humanManagement.updateUser(this.selectedUser).subscribe(
    (data) => {
        console.log(data);
        this.selectedUser = null;
        this.editMode = false;
    },
        (error) => console.log(error)
    );
}
}

  deleteUser(id, i) {
    this.humanManagement.removeUserById(id).subscribe(
      () => {
        this.users.splice(i, 1);
        this.toastr.success('Delete Successful');
      },
      () => {
        this.toastr.error('An error has occured!');
      }
    );
  }

}
