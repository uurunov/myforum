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

  createComment(data: any, topicId: number) {
    return this.http.post(
      this.apiURL + '/topics/' + topicId + '/comments',
      data,
      this.httpOptions
    );
  }

  getComments(topicId: number) {
    return this.http.get(
      this.apiURL + '/topics/' + topicId + '/comments',
      this.httpOptions
    );
  }

  updateComment(data: any, id: number) {
    return this.http.put(
      this.apiURL + '/comments/' + id,
      data,
      this.httpOptions
    );
  }

  deleteComment(id: number) {
    return this.http.delete(this.apiURL + '/comments/' + id, this.httpOptions);
  }
}
