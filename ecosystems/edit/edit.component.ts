// edit.component.ts for Ecosystems
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcosystemService } from '../ecosystems.service'; // Import your Ecosystem service
import { Ecosystem } from '../ecosystems'; // Import your Ecosystem model
import { GreenhouseService } from '../../greenhouses/greenhouses.service'; // Assuming you need greenhouses
import { Greenhouse } from '../../greenhouses/greenhouse'; // Import Greenhouse model

@Component({
  selector: 'app-edit-ecosystem',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EcosystemEditComponent implements OnInit {
  editForm!: FormGroup;
  isLoading = true;
  ecosystemId!: string; // Store the ecosystem ID
  greenhouses!: Greenhouse[]; // Store greenhouses for the dropdown

  constructor(
    private ecosystemService: EcosystemService,
    private greenhouseService: GreenhouseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.ecosystemId = this.route.snapshot.paramMap.get('id')!;
    if (this.ecosystemId) {
      this.ecosystemService.getEcosystemById(this.ecosystemId).subscribe({
        next: (ecosystem) => {
          this.initializeForm(ecosystem);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching ecosystem', error);
          this.isLoading = false;
        }
      });
      this.greenhouseService.getGreenhouses().subscribe({
        next: (data) => this.greenhouses = data,
        error: (error) => console.error('Error fetching greenhouses', error)
      });
    } else {
      console.error('No ecosystem ID provided in the route');
      // Handle the missing ID case
    }
  }

  initializeForm(ecosystem: Ecosystem) {
    this.editForm = this.fb.group({
      type: [ecosystem.type, Validators.required],
      description: [ecosystem.description, Validators.required],
      greenhouseId: [ecosystem.greenhouseId, Validators.required],
      // Add other fields as necessary
    });
  }

  onSubmit() {
    if (this.editForm.valid && this.ecosystemId) {
      this.ecosystemService.updateEcosystem(this.ecosystemId, this.editForm.value).subscribe({
        next: () => this.router.navigate(['/ecosystems', this.ecosystemId]),
        error: (error) => console.error('Error updating ecosystem', error)
      });
    } else {
      console.error('Form is invalid or no ecosystem ID.');
      // Handle form errors or missing ecosystem ID here
    }
  }
}
