import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service'; // Import your UserService
import { Router } from '@angular/router'; // Import the router

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService, // Inject the UserService here
    private router: Router // Inject the router here
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Minimum length 6 characters
      username: ['', Validators.required],
      dateJoined: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (newUser) => {
          console.log('New user added:', newUser);
          this.router.navigate(['/users']); // Redirect to the list of users
        },
        error: (error) => {
          console.error('There was an error adding the user',
            error);
          this.errorMessage = 'Failed to create user. Please try again.';
        }
      });
    } else {
      // If the form is invalid, trigger validation messages
      Object.values(this.userForm.controls).forEach(control => {
        if (!control.valid) {
          control.markAsTouched();
        }
      });
    }
  }
}