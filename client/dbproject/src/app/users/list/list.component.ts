// src/app/users/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Import your UserService
import { User } from '../user'; // Import the User interface

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users', error);
      },
      // complete is optional and can be omitted if you don't need to do anything on completion
      complete: () => {
        console.log('Finished fetching users');
      }
    });
  }
}
