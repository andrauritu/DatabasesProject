// src/app/greenhouses/show/show.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GreenhouseService } from '../greenhouses.service';
import { Greenhouse } from '../greenhouse'; // Assuming you have a Greenhouse model

@Component({
  selector: 'app-greenhouse-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class GreenhouseShowComponent implements OnInit {
  greenhouse: Greenhouse | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private greenhouseService: GreenhouseService,
    private router: Router
  ) { }

  ngOnInit() {
    const greenhouseId = this.route.snapshot.paramMap.get('id');
    if (greenhouseId) {
      this.greenhouseService.getGreenhouse(greenhouseId).subscribe({
        next: (data) => {
          this.greenhouse = data;
          this.isLoading = false;
          console.log('Greenhouse fetch completed');
        },
        error: (error) => {
          console.error('Error fetching greenhouse details', error);
          this.isLoading = false;
          // Handle the error appropriately
        }
        // No need for a complete callback if you're not using it
      });
    } else {
      console.error('No greenhouse ID provided in the route');
      this.isLoading = false;
      // Handle missing ID, such as redirecting
    }
  }

  deleteGreenhouse() {
    if (this.greenhouse && this.greenhouse._id) {
      this.greenhouseService.deleteGreenhouse(this.greenhouse._id).subscribe({
        next: () => {
          console.log('Greenhouse deleted successfully');
          this.router.navigate(['/greenhouses']); // Redirect to the greenhouse list
        },
        error: (error) => console.error('Error deleting greenhouse', error)
      });
    }
  }
}
