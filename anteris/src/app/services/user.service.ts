import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(this.api);
  }

  findById(id) {
    return this.http.get(this.api + id);
  }

  addUser(vote) {
    return this.http.post(this.api, vote);
  }

  updateUser(user) {
    return this.http.put(this.api, user);
  }

  removeById(id) {
    return this.http.delete(this.api + id);
  }

  unbanById(id) {
    return this.http.delete(this.api + 'unban/' + id);
  }
}
