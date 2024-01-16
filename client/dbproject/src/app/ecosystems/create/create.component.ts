// src/app/ecosystems/create/create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcosystemService } from '../ecosystems.service'; // Import your EcosystemService
import { GreenhouseService } from '../../greenhouses/greenhouses.service'; // Import GreenhouseService if needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecosystem-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class EcosystemCreateComponent implements OnInit {
  ecosystemForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  greenhouses!: any[]; // Replace 'any' with your Greenhouse interface

  constructor(
    private fb: FormBuilder,
    private ecosystemService: EcosystemService,
    private greenhouseService: GreenhouseService, // Inject this only if you need to list greenhouses
    private router: Router
  ) { }

  ngOnInit() {
    this.ecosystemForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      greenhouseId: ['', Validators.required] // Remove if not linking ecosystems to greenhouses
    });
    // Uncomment the following if you need to get a list of greenhouses
    this.greenhouseService.getGreenhouses().subscribe({
      next: (data) => this.greenhouses = data,
      error: (error) => console.error('Error fetching greenhouses', error),
      complete: () => console.log('Greenhouse fetch complete') // Optional
    });
  }

  onSubmit() {
    if (this.ecosystemForm.valid) {
      this.ecosystemService.addEcosystem(this.ecosystemForm.value).subscribe({
        next: (newEcosystem) => {
          console.log('New ecosystem added:', newEcosystem);
          this.router.navigate(['/ecosystems']); // Adjust as needed
        },
        error:

          (error) => {
            console.error('There was an error adding the ecosystem', error);
            this.errorMessage = 'There was an error adding the ecosystem.';
          }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      Object.values(this.ecosystemForm.controls).forEach(control => {
        if (!control.valid) {
          control.markAsTouched();
        }
      });
    }
  }
}