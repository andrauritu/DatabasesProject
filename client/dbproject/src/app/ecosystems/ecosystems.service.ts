// src/app/ecosystems/ecosystem.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ecosystem } from './ecosystem'; // Make sure this path points to your Ecosystem interface

@Injectable({
    providedIn: 'root'
})
export class EcosystemService {
    private apiUrl = 'http://localhost:3000/api/ecosystems'; // Update this with the actual URL to your API

    constructor(private http: HttpClient) { }

    getEcosystems(): Observable<Ecosystem[]> {
        return this.http.get<Ecosystem[]>(this.apiUrl);
    }

    getEcosystemById(id: string): Observable<Ecosystem> {
        return this.http.get<Ecosystem>(`${this.apiUrl}/${id}`);
    }

    addEcosystem(ecosystem: Ecosystem): Observable<Ecosystem> {
        return this.http.post<Ecosystem>(this.apiUrl, ecosystem);
    }

    updateEcosystem(id: string, ecosystem: Ecosystem): Observable<Ecosystem> {
        return this.http.put<Ecosystem>(`${this.apiUrl}/${id}`, ecosystem);
    }

    deleteEcosystem(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}