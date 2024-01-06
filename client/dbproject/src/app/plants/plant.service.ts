// src/app/plants/plant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from './plant'; // Import your interface

@Injectable({
    providedIn: 'root'
})
export class PlantService {
    private apiUrl = 'http://localhost:3000/api/plants'; // Your API endpoint

    constructor(private http: HttpClient) { }

    addPlant(plantData: Plant): Observable<Plant> {
        return this.http.post<Plant>(this.apiUrl, plantData);
    }

    getPlants(): Observable<Plant[]> {
        return this.http.get<Plant[]>(this.apiUrl);
    }

    getPlantById(id: string): Observable<Plant> {
        return this.http.get<Plant>(`${this.apiUrl}/${id}`);
    }

    deletePlant(id: string): Observable<Plant> {
        return this.http.delete<Plant>(`${this.apiUrl}/${id}`);
    }

    updatePlant(id: string, plantData: Plant): Observable<Plant> {
        return this.http.put<Plant>(`${this.apiUrl}/${id}`, plantData);
    }

}
