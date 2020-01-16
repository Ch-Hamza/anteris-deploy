import {Component, OnInit} from '@angular/core';
import {HumanManagementService} from '../../../services/humanManagement.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PendingAccountService} from '../../../services/pendingAccount.service';
import {ClipboardService} from 'ngx-clipboard';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  roleForm: FormGroup;
  users;
  pendingCount: number;
  editMode = false;
  selectedUser;
  dropdownListRoles = [
    'ROLE_ADMIN',
    'ROLE_USER',
    'ROLE_FINANCIAL_MANAGER',
    'ROLE_'
  ];

  constructor(private formBuilder: FormBuilder,
              private humanManagement: HumanManagementService,
              private pendingAccountService: PendingAccountService,
              private toastr: ToastrService,
              private clipboardService: ClipboardService) {
  }

  initForm() {
    this.roleForm = this.formBuilder.group({
    role: [this.selectedUser.roles]
  });
}
  ngOnInit() {
    this.pendingAccountService.countAll().subscribe(
      (data) => this.pendingCount = data as number
    );
    this.humanManagement.findAll().subscribe(
      (data) =>  this.users = data,
      () => this.toastr.error('An error has occured!'));
  }

  sendInvitation(email) {
    this.pendingAccountService.invite(email).subscribe(
      (data) => {
        this.toastr.success('Invitation Sent');
        // @ts-ignore
        this.clipboardService.copyFromContent(data.message as string);
        this.pendingAccountService.countAll().subscribe(
          (d) => this.pendingCount = d as number
        );
      },
      () => this.toastr.warning('Invitation Error')
    );
  }
  deleteInvitation() {
    this.pendingAccountService.deleteAll().subscribe(
      () => {
        this.pendingCount = 0;
        this.toastr.success('Invitations Deleted');
      },
      () => this.toastr.warning('Delete Error')
    );
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
