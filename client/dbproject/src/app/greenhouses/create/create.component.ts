// src/app/greenhouses/create/create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GreenhouseService } from '../greenhouses.service'; // Import your GreenhouseService
import { Greenhouse } from '../greenhouse'; // Import your Greenhouse interface
import { Router } from '@angular/router'; // Import the router

@Component({
  selector: 'app-greenhouse-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class GreenhouseCreateComponent implements OnInit {
  greenhouseForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private greenhouseService: GreenhouseService, // Inject the GreenhouseService here
    private router: Router // Inject the router here
  ) { }

  ngOnInit() {
    this.greenhouseForm = this.fb.group({
      name: ['', Validators.required],
      // Add other greenhouse form controls as needed
    });
  }

  onSubmit() {
    if (this.greenhouseForm.valid) {
      this.greenhouseService.createGreenhouse(this.greenhouseForm.value).subscribe({
        next: (newGreenhouse) => {
          console.log('New greenhouse added:', newGreenhouse);
          this.router.navigate(['/greenhouses']); // Redirect to the greenhouse list
        },
        error: (error) => {
          console.error('There was an error adding the greenhouse', error);
          this.errorMessage = 'There was an error adding the greenhouse.';
        }
      });
    } else {
      for (const control of Object.values(this.greenhouseForm.controls)) {
        control.markAsTouched();
      }
    }
  }
}
