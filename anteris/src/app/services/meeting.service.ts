import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  api = 'http://54.36.182.216:8085/meeting/';

  constructor(private http: HttpClient) { }

  findAll(id) {
    return this.http.get(this.api + 'user/' + id);
  }

  findById(id) {
    return this.http.get(this.api + id);
  }

  newmeeting(meeting) {
    return this.http.post(this.api, meeting);
  }

  updateMeeting(meeting) {
    return this.http.put(this.api, meeting);
  }

  removeById(id) {
    return this.http.delete(this.api + id);
  }
}
