import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {PendingAccountService} from '../../../services/pendingAccount.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  addUser: FormGroup;

  dropdownListRoles = [
    'ROLE_ADMIN',
    'ROLE_USER',
    'ROLE_FINANCIAL_MANAGER'
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private pendingAccount: PendingAccountService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm('');
    this.activatedRoute.params.subscribe(
      (data) => {
        this.pendingAccount.getById(data.id).subscribe(

          (dt) => {
            // @ts-ignore
            this.initForm(dt.email);
          },
          (error) => this.route.navigate(['/'])
        );
      }
    );
  }

  initForm(email) {
    this.addUser = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: [email],
      role: [['ROLE_USER']],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.addUser.controls;
  }

  onSubmit() {
    console.log(this.addUser.value);
    // stop here if form is invalid
    if (this.addUser.invalid) {
      return;
    }

    this.userService.addUser(this.addUser.value).subscribe(
      (data: any) => {
        this.toastr.success('Member added successfully!');
      },
      error => {
        this.toastr.error('An error has occured!');
      }
    );
  }

}
