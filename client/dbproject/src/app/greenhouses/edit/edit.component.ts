// src/app/greenhouses/edit/edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GreenhouseService } from '../greenhouses.service'; // Make sure to use the correct path
import { Greenhouse } from '../greenhouse'; // And the correct Greenhouse model path

@Component({
  selector: 'app-greenhouse-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class GreenhouseEditComponent implements OnInit {
  editForm!: FormGroup;
  isLoading = true;
  greenhouseId!: string; // Store the greenhouse ID

  constructor(
    private greenhouseService: GreenhouseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.greenhouseId = this.route.snapshot.paramMap.get('id')!;
    if (this.greenhouseId) {
      this.greenhouseService.getGreenhouse(this.greenhouseId).subscribe({
        next: (greenhouse) => {
          this.initializeForm(greenhouse);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching greenhouse', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('No greenhouse ID provided in the route');
      // Handle the missing ID case, perhaps redirecting the user
    }
  }

  initializeForm(greenhouse: Greenhouse) {
    this.editForm = this.fb.group({
      name: [greenhouse.name, Validators.required],
      // Add other fields as necessary
    });
  }

  onSubmit() {
    if (this.editForm.valid && this.greenhouseId) {
      this.greenhouseService.updateGreenhouse(this.greenhouseId, this.editForm.value).subscribe({
        next: () => this.router.navigate(['/greenhouses']),
        error: (error) => console.error('Error updating greenhouse', error)
      });
    } else {
      console.error('Form is invalid or no greenhouse ID.');
      // Handle form errors or missing greenhouse ID here
    }
  }
}
