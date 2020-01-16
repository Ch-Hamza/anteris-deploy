import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  api = 'http://54.36.182.216:8085/vote/';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(this.api);
  }

  findById(id) {
    return this.http.get(this.api + id);
  }

  newVote(vote) {
    return this.http.post(this.api, vote);
  }

  updateVote(vote) {
    return this.http.put(this.api, vote);
  }

  removeById(id) {
    return this.http.delete(this.api + id);
  }

  sendVote(voteForm) {
    return this.http.put(this.api + 'send-vote', voteForm);
  }
}
