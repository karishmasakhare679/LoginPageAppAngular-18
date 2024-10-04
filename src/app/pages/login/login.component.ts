import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: any = {
    user_id: '',
    password: '',
  };

  

  http = inject(HttpClient);

  constructor(private router: Router) {}

  onLogin(event: Event) {
    debugger;
    event.preventDefault(); // Prevent default form submission

    this.http.post('http://localhost:3000/login', this.loginObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert('Login successful');

          localStorage.setItem('loginToken', res.token);
          localStorage.setItem('angular18Login', this.loginObj.user_id);
          this.router.navigateByUrl('/dashboared');
        } else {
          // alert('Please check user ID or password');
          console.log("Please check user ID or password")
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('An error occurred during login. Please try again.');
      },
    });
  }

  showForgotPassword = false;
  onForgotPassword() {
    this.showForgotPassword = true; // Open the forgot password form
  }
}
