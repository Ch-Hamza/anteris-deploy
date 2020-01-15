import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { VoteService } from 'src/app/services/vote.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vote-form',
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.css']
})
export class VoteFormComponent implements OnInit {

  addVote: FormGroup;

  dropdownListRoles = [
    'ROLE_ADMIN',
    'ROLE_USER',
    'ROLE_'
  ];

  constructor(private formBuilder: FormBuilder,
    private voteService: VoteService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addVote = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      start_date: [],
      end_date: [],
      role_restriction: [[]],
      voteOptionResponses: this.formBuilder.array([]),
    });
  }

  get f() {
    return this.addVote.controls;
  }

  get voteOptionResponses() {
    return this.addVote.get('voteOptionResponses') as FormArray;
  }

  addVoteOption() {
    this.voteOptionResponses.push(this.formBuilder.group({
      title: [''],
    }));
  }

  removeVoteOption(i) {
    this.voteOptionResponses.removeAt(i);
  }

  onSubmit() {
    //console.log(this.addVote.value);

    // stop here if form is invalid
    if (this.addVote.invalid) {
      return;
    }

    this.voteService
      .newVote(this.addVote.value)
      .subscribe(
        (data: any) => {
          this.toastr.success('Vote added successfully!');
          //console.log(data);
          this.router.navigate(['/vote']);
        },
        error => {
          this.toastr.error('An error has occured!');
        }
    );
  }

}
