import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PendingAccountService {
  api = 'http://54.36.182.216:8085/pending/';


  constructor(private http: HttpClient) {
  }
  deleteAll() {
    return this.http.delete(this.api);
  }

  invite(email) {
    return this.http.post(this.api, {email});
  }

  countAll() {
    return this.http.get(this.api + 'count');
  }

  getById(id) {
    return this.http.get(this.api + 'id/' +  id);
  }

}
