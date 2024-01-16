// src/app/ecosystems/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { EcosystemService } from '../ecosystems.service'; // Import your EcosystemService
import { Ecosystem } from '../ecosystem'; // Import the Ecosystem interface

@Component({
  selector: 'app-ecosystem-list',
  templateUrl:
    './list.component.html',
  styleUrls: ['./list.component.css']
})
export class EcosystemListComponent implements OnInit {
  ecosystems: Ecosystem[] = [];
  isLoading = true;

  constructor(private ecosystemService: EcosystemService) { }

  ngOnInit() {
    this.ecosystemService.getEcosystems().subscribe({
      next: (data) => {
        this.ecosystems = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching ecosystems', error);
        this.isLoading = false;
      }
    });
  }
}