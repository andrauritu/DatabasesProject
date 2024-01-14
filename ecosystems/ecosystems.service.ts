// src/app/ecosystems/ecosystem.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ecosystem } from './ecosystems'; // Import your ecosystem interface

@Injectable({
    providedIn: 'root'
})
export class EcosystemService {
    private apiUrl = 'http://localhost:3000/api/ecosystems'; // Your API endpoint for ecosystems

    constructor(private http: HttpClient) { }

    addEcosystem(ecosystemData: Ecosystem): Observable<Ecosystem> {
        return this.http.post<Ecosystem>(this.apiUrl, ecosystemData);
    }

    getEcosystems(): Observable<Ecosystem[]> {
        return this.http.get<Ecosystem[]>(this.apiUrl);
    }

    getEcosystemById(id: string): Observable<Ecosystem> {
        return this.http.get<Ecosystem>(`${this.apiUrl}/${id}`);
    }

    deleteEcosystem(id: string): Observable<Ecosystem> {
        return this.http.delete<Ecosystem>(`${this.apiUrl}/${id}`);
    }

    updateEcosystem(id: string, ecosystemData: Ecosystem): Observable<Ecosystem> {
        return this.http.put<Ecosystem>(`${this.apiUrl}/${id}`, ecosystemData);
    }
}
