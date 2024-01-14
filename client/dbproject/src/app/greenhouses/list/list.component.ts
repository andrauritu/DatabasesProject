// src/app/greenhouses/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { GreenhouseService } from '../greenhouses.service';
import { Greenhouse } from '../greenhouse';

@Component({
  selector: 'app-greenhouse-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class GreenhouseListComponent implements OnInit {
  greenhouses: Greenhouse[] = [];

  constructor(private greenhouseService: GreenhouseService) { }

  ngOnInit() {
    this.greenhouseService.getGreenhouses().subscribe(
      (data) => this.greenhouses = data,
      (error) => console.error('Error fetching greenhouses', error)
    );
  }
}
