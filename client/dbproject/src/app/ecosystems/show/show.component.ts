// src/app/ecosystems/show/show.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcosystemService } from '../ecosystems.service';
import { Ecosystem } from '../ecosystem'; // Import your Ecosystem model

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
    const ecosystemId = this.route.snapshot.paramMap.get('id');
    if (ecosystemId) {
      this.ecosystemService.getEcosystemById(ecosystemId).subscribe({
        next: (data) => {
          this.ecosystem = data;
          this.isLoading = false;
          console.log('Ecosystem fetch completed');
        },
        error: (error) => {
          console.error('Error fetching ecosystem details', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('No ecosystem ID provided in the route');
      this.isLoading = false;
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
