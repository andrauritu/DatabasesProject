// src/app/greenhouses/greenhouse.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Greenhouse } from './greenhouse';

@Injectable({
  providedIn: 'root'
})
export class GreenhouseService {
  private apiUrl = 'http://localhost:3000/api/greenhouses'; // Update with your API endpoint

  constructor(private http: HttpClient) { }

  getGreenhouses(): Observable<Greenhouse[]> { // Replace 'any' with your greenhouse type
    return this.http.get<Greenhouse[]>(this.apiUrl);
  }
}
