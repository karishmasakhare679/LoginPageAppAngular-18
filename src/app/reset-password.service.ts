import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private apiUrl = 'http://localhost:3000/reset-password'; // Your backend API URL

  constructor(private http: HttpClient) { }

  // Method to call reset password API
  resetPassword(user_id: string, resetToken: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      user_id: user_id,
      resetToken: resetToken,
      newPassword: newPassword
    };

    return this.http.post(this.apiUrl, body, { headers: headers });
  }
}
