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

  // Get all topics
  getTopics() {
    return this.http.get(this.apiURL, this.httpOptions);
  }

  // Get topic by ID
  getTopic(ID: any) {
    return this.http.get(this.apiURL + '/' + ID, this.httpOptions);
  }

  // Add new topic
  addNewTopic(data: any) {
    return this.http.post(this.apiURL, data, { responseType: 'text' });
  }

  // send request about editing a topic by ID
  updateTopic(data: any, id: number) {
    return this.http.put(this.apiURL + '/' + id, data, this.httpOptions);
  }

  // send request about deleting a topic by ID
  deleteTopic(id: number) {
    return this.http.delete(this.apiURL + '/' + id, this.httpOptions);
  }
}
