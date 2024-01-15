// src/app/users/show/show.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService }
  from '../user.service';
import { User } from '../user'; // Import your User model

@Component({
  selector: 'app-user-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class UserShowComponent implements OnInit {
  user: User | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = data;
          this.isLoading = false;
          console.log('User fetch completed');
        },
        error: (error) => {
          console.error('Error fetching user details', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('No user ID provided in the route');
      this.isLoading = false;
    }
  }

  deleteUser() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.router.navigate(['/users']); // Redirect to the user list
        },
        error: (error) => console.error('Error deleting user', error)
      });
    }
  }
}