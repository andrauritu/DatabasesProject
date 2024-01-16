// In your service file (e.g., src/app/joins.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JoinsService {
  constructor(private http: HttpClient) { }

  getJoinedData() {
    return this.http.get('http://localhost:3000/api/join-visits');
  }
}
