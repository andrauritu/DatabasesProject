// src/app/ecosystems/show/show.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcosystemService } from '../ecosystems.service'; // Import your EcosystemService
import { Ecosystem } from '../ecosystems'; // Import your Ecosystem model

@Component({
  selector: 'app-ecosystem-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class EcosystemShowComponent implements OnInit {
  ecosystem: Ecosystem | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private ecosystemService: EcosystemService,
    private router: Router
  ) { }

  ngOnInit() {
    // Extract the 'id' parameter and ensure it's a string
    const ecosystemId = this.route.snapshot.paramMap.get('id');
    if (ecosystemId) {
      this.ecosystemService.getEcosystemById(ecosystemId).subscribe({
        next: (data) => {
          this.ecosystem = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching ecosystem details', error);
          this.isLoading = false;
          // Handle the error appropriately
        },
        complete: () => console.log('Ecosystem fetch completed') // Optional
      });
    } else {
      console.error('No ecosystem ID provided in the route');
      this.isLoading = false;
      // Handle the missing ID case appropriately
    }
  }

  deleteEcosystem() {
    const ecosystemId = this.route.snapshot.paramMap.get('id');
    if (ecosystemId) {
      this.ecosystemService.deleteEcosystem(ecosystemId).subscribe({
        next: () => {
          console.log('Ecosystem deleted successfully');
          this.router.navigate(['/ecosystems']); // Redirect to the ecosystem list
        },
        error: (error) => console.error('Error deleting ecosystem', error)
      });
    }
  }
}
