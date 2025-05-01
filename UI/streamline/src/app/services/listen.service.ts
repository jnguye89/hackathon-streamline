import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListenService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStations(limit = 100): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/listen/stations/${limit}`);
  }
}
