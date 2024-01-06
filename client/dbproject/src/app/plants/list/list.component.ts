// src/app/plants/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlantService } from '../plant.service'; // Import your PlantService
import { Plant } from '../plant'; // Import the Plant interface

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class PlantListComponent implements OnInit {
  plants: Plant[] = [];

  constructor(private plantService: PlantService) { }

  ngOnInit() {
    this.plantService.getPlants().subscribe(
      (data) => this.plants = data,
      (error) => console.error('Error fetching plants', error)
    );
  }
}