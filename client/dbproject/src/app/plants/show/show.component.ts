import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from '../plant.service';
import { Plant } from '../plant'; // Assuming you have a Plant model

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class PlantShowComponent implements OnInit {
  plant: Plant | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private router: Router
  ) { }

  ngOnInit() {
    // Extract the 'id' parameter and ensure it's a string
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      this.plantService.getPlantById(plantId).subscribe({
        next: (data) => {
          this.plant = data;
          this.isLoading = false;
          console.log('Plant fetch completed');
        },
        error: (error) => {
          console.error('Error fetching plant details', error);
          this.isLoading = false;
          // Handle the error, for example, by showing an error message or redirecting
        },
        complete: () => console.log('Plant fetch completed') // This is optional
      });
    } else {
      console.error('No plant ID provided in the route');
      // Handle the missing ID case, perhaps redirecting the user
      this.isLoading = false;
    }
  }
  deletePlant() {
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      this.plantService.deletePlant(plantId).subscribe({
        next: () => {
          console.log('Plant deleted successfully');
          this.router.navigate(['/plants']); // Redirect to the plant list
        },
        error: (error) => console.error('Error deleting plant', error)
      });
    }
  }
}
