import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerObj: any = {
    "user_id": "",
    "password": "",
    "fullName": "",
    "confirmPassword": "",
    "email": ""
  };

  loginObj: any = {
    user_id: "",
    password: ""
  };

  constructor(private router: Router, private http: HttpClient) {}

  register() {debugger;
    // Basic validation (optional)
    if (!this.registerObj.user_id || !this.registerObj.password || !this.registerObj.fullName || !this.registerObj.confirmPassword || !this.registerObj.email) {
      alert("All fields are required!");
      return;
    }

    if (this.registerObj.password !== this.registerObj.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

      this.http.post('http://localhost:3000/register', this.registerObj).subscribe({
        next: (response) => {
          alert("Registration successful!"); // This should show
          localStorage.setItem("UserName", this.registerObj.user_id);
        },
        error: (error) => {
          alert("Registration failed!"); // This should show
        }
      });
  }


  onLogin(event: Event) {debugger;
    event.preventDefault(); // Prevent default form submission

    this.http.post("http://localhost:3000/login", this.loginObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert('Login successful');
          localStorage.setItem("angular18Login", this.loginObj.user_id);
          this.router.navigateByUrl("/dashboared");
        } else {
          alert('Please check user ID or password');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('An error occurred during login. Please try again.');
      }
    });
  }
}