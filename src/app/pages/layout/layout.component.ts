import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  http = inject(HttpClient);

  constructor(private router: Router) {}

  logout() {
    this.http.get("http://localhost:3000/logout").subscribe({
      next: (response: any) => {
        if (response.result) {
          console.log(response.message);
          alert('user logout successfully')
          // Clear any client-side storage
          localStorage.removeItem('angular18Login');
          // Redirect to login page or home page
          this.router.navigate(['/login']);
        } else {
          console.error('Logout failed:', response.message);
        }
      },
      error: (error) => {
        console.error('Error during logout:', error);
      }
    });
  }

}
