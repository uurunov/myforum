import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TopicsService implements OnInit {
  apiURL: string = 'http://localhost:8080/api/user/topics';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  ngOnInit() {}

  constructor(private http: HttpClient) {}

  getTopics() {
    return this.http.get(this.apiURL, this.httpOptions);
  }

  getTopic(ID: any) {
    return this.http.get(this.apiURL + '/' + ID, this.httpOptions);
  }
}
