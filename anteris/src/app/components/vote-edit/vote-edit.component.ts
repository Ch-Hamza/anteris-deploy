import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { VoteService } from 'src/app/services/vote.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote-edit',
  templateUrl: './vote-edit.component.html',
  styleUrls: ['./vote-edit.component.css']
})
export class VoteEditComponent implements OnInit {

  editVote: FormGroup;
  vote;
  loaded = false;

  dropdownListRoles = [
    'ROLE_ADMIN',
    'ROLE_USER',
    'ROLE_'
  ];

  constructor(private formBuilder: FormBuilder,
    private voteService: VoteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      this.voteService.findById(params['id']).subscribe(data => {
        this.vote = data;
        console.log(data)
        this.initForm();
        this.loaded = true;
      });
    });
  }

  initForm() {
    this.editVote = this.formBuilder.group({
      title: [this.vote.title, Validators.required],
      description: [this.vote.description, Validators.required],
      start_date: [this.vote.start_date],
      end_date: [this.vote.end_date],
      role_restriction: [this.vote.role_restriction],
      vote_options: this.formBuilder.array([]),
    });

    this.vote.vote_options.forEach(option => {
      this.vote_options.push(this.formBuilder.group({
        id: option.id,
        title: option.title
      }));
    });
  }

  get f() {
    return this.editVote.controls;
  }

  get vote_options() {
    return this.editVote.get('vote_options') as FormArray;
  }

  addVoteOption() {
    this.vote_options.push(this.formBuilder.group({
      title: [''],
    }));
  }

  removeVoteOption(i) {
    this.vote_options.removeAt(i);
  }

  onSubmit() {
    console.log(this.editVote.value);
    this.editVote.addControl('id', new FormControl(this.vote.id));
    // stop here if form is invalid
    if (this.editVote.invalid) {
      return;
    }

    this.voteService
      .updateVote(this.editVote.value)
      .subscribe(
        (data: any) => {
          this.toastr.success('Vote edited successfully!');
          //console.log(data);
          this.router.navigate(['/vote']);
        },
        error => {
          this.toastr.error('An error has occured!');
        }
    );
  }

}
