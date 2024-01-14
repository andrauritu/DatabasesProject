// src/app/ecosystems/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { EcosystemService } from '../ecosystems.service'; // Import your EcosystemService
import { Ecosystem } from '../ecosystems'; // Import the Ecosystem interface

@Component({
  selector: 'app-ecosystem-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class EcosystemListComponent implements OnInit {
  ecosystems: Ecosystem[] = [];

  constructor(private ecosystemService: EcosystemService) { }

  ngOnInit() {
    this.ecosystemService.getEcosystems().subscribe(
      (data) => this.ecosystems = data,
      (error) => console.error('Error fetching ecosystems', error)
    );
  }
}
