import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/videos`);
  }

  uploadVideo(video: File, title: string): Observable<any> {
    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}
