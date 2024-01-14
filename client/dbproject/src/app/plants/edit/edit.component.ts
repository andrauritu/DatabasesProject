// edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantService } from '../plant.service';
import { Plant } from '../plant'; // Your Plant model

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class PlantEditComponent implements OnInit {
  editForm!: FormGroup;
  isLoading = true;
  plantId!: string; // Store the plant ID

  constructor(
    private plantService: PlantService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }
  // ngOnInit() {
  //   const plantId = this.route.snapshot.paramMap.get('id');
  //   if (plantId) {
  //     this.plantService.getPlantById(plantId).subscribe({
  //       next: (data) => {
  //         this.plant = data;
  //         this.initializeForm(data);
  //       },
  //       error: (error) => console.error('Error fetching plant', error)
  //     });
  //   }
  // }

  ngOnInit() {
    this.plantId = this.route.snapshot.paramMap.get('id')!;
    if (this.plantId) {
      this.plantService.getPlantById(this.plantId).subscribe({
        next: (plant) => {
          this.initializeForm(plant);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching plant', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('No plant ID provided in the route');
      // Handle the missing ID case, perhaps redirecting the user
    }
  }


  initializeForm(plant: Plant) {
    this.editForm = this.fb.group({
      datePlanted: [plant.datePlanted, Validators.required],
      height: [plant.height, [Validators.required, Validators.min(1)]],
      greenhouseId: [plant.greenhouseId, Validators.required],
      // Add other fields as necessary
    });
  }

  onSubmit() {
    if (this.editForm.valid && this.plantId) {
      this.plantService.updatePlant(this.plantId, this.editForm.value).subscribe({
        next: () => this.router.navigate(['/plants', this.plantId]),
        error: (error) => console.error('Error updating plant', error)
      });
    } else {
      console.error('Form is invalid or no plant ID.');
      // Handle form errors or missing plant ID here
    }
  }
}
