import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HumanManagementService {

  api = 'http://54.36.182.216:8085/users/';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(this.api);
  }
  findById(id) {
    return this.http.get(this.api + id);
  }
  // response must contain the inserted user
  newUser(user) {
    return this.http.post(this.api, user);
  }
  updateUser(user) {
    return this.http.put(this.api, user);
  }
  removeUserById(id) {
    return this.http.delete(this.api + id);
  }
}
