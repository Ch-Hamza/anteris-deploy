import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  api = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  pushFilesToStorage(file, meeting_id) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    
    const req = new HttpRequest('POST', this.api + '/record/upload-file/' + meeting_id, formdata, {
      reportProgress: true,
      responseType: 'text',
    });
 
    return this.http.request(req);
  }
}
