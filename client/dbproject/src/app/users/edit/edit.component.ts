// src/app/users/edit/edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user'; // Your User model

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UserEditComponent implements OnInit {
  editForm!: FormGroup;
  isLoading = true;
  userId!: string; // Store the user ID

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          this.initializeForm(user);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching user', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('No user ID provided in the route');
      // Handle the missing ID case, perhaps redirecting the user
    }
  }

  initializeForm(user: User) {
    this.editForm = this.fb.group({
      email: [user.email, [Validators.required, Validators.email]],
      username: [user.username, Validators.required],
      dateJoined: [user.dateJoined, Validators.required],
      // password field is typically not included in an edit form
      // Add other fields as necessary
    });
  }

  onSubmit() {
    if (this.editForm.valid && this.userId) {
      this.userService.updateUser(this.userId, this.editForm.value).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (error) => console.error
          ('Error updating user', error)
      });
    } else {
      console.error('Form is invalid or no user ID.');
      // Handle form errors or missing user ID here
    }
  }
}