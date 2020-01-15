import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {

  editUser: FormGroup;
  user;
  loaded = false;

  dropdownListRoles = [
    'ROLE_ADMIN',
    'ROLE_USER',
    'ROLE_'
  ];

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.loadData();
    }
  
    loadData() {
      this.route.params.subscribe(params => {
        this.userService.findById(params['id']).subscribe(data => {
          this.user = data;
          console.log(data)
          this.initForm();
          this.loaded = true;
        });
      });
    }
  
    initForm() {
      this.editUser = this.formBuilder.group({
        firstname: [this.user.firstname],
        lastname: [this.user.lastname],
        username: [this.user.username],
        email: [this.user.email],
        roles: [this.user.roles],
      });
    }
  
    get f() {
      return this.editUser.controls;
    }
  
    onSubmit() {
      console.log(this.editUser.value);
      this.editUser.addControl('id', new FormControl(this.user.id));
      // stop here if form is invalid
      if (this.editUser.invalid) {
        return;
      }
  
      this.userService.updateUser(this.editUser.value).subscribe(
        (data: any) => {
          this.toastr.success('Member edited successfully!');
          //console.log(data);
          this.ngOnInit();
        },
        error => {
          this.toastr.error('An error has occured!');
        }
      );
    }

}
