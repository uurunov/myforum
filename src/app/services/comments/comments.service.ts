import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  apiURL: string = 'http://localhost:8080/api/user';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // send request about storing new comment into the selected topic by ID
  createComment(data: any, topicId: number) {
    return this.http.post(
      this.apiURL + '/topics/' + topicId + '/comments',
      data,
      this.httpOptions
    );
  }

  // get all comments belonging to the selected topic by ID
  getComments(topicId: number) {
    return this.http.get(
      this.apiURL + '/topics/' + topicId + '/comments',
      this.httpOptions
    );
  }

  // send request about editing a comment by ID
  updateComment(data: any, id: number) {
    return this.http.put(
      this.apiURL + '/comments/' + id,
      data,
      this.httpOptions
    );
  }

  // send request about deleting a comment by ID
  deleteComment(id: number) {
    return this.http.delete(this.apiURL + '/comments/' + id, this.httpOptions);
  }
}
