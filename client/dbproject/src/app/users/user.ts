// src/app/users/user.ts

export interface User {
    _id?: string; // Optional since MongoDB will create it automatically
    email: string;
    password: string; // Note: In a real-world app, you should handle passwords securely
    username: string;
    dateJoined: Date;
}
