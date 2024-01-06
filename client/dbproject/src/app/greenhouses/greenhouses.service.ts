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

  getGreenhouse(id: string): Observable<Greenhouse> { // Replace 'any' with your greenhouse type
    return this.http.get<Greenhouse>(`${this.apiUrl}/${id}`);
  }

  createGreenhouse(greenhouse: Greenhouse): Observable<Greenhouse> {
    return this.http.post<Greenhouse>(this.apiUrl, greenhouse);
  }

  updateGreenhouse(greenhouse: Greenhouse): Observable<Greenhouse> {
    return this.http.put<Greenhouse>(`${this.apiUrl}/${greenhouse._id}`, greenhouse);
  }

  deleteGreenhouse(id: string): Observable<Greenhouse> {
    return this.http.delete<Greenhouse>(`${this.apiUrl}/${id}`);
  }
}
