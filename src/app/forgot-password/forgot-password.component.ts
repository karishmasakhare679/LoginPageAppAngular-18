import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ResetPasswordService } from '../reset-password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordObj = {
    user_id: '',
    resetToken: '',
    newPassword: ''
  };

  showForgotPassword = false;
  showResetPassword = false;

  http = inject(HttpClient);

  constructor(private router: Router, private resetPasswordService: ResetPasswordService) {}

  onForgotPassword() {
    this.showForgotPassword = true;
  }

  closeForgotPassword() {
    this.showForgotPassword = false;
    this.showResetPassword = false;
  }

  sendResetLink() {
    // Step 1: Send reset link
    this.http.post("http://localhost:3000/forgot-password", { user_id: this.forgotPasswordObj.user_id })
      .subscribe({
        next: (res: any) => {
          alert('Reset link has been sent to your email.');
          this.showForgotPassword = false;
          this.showResetPassword = true; // Move to step 2
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Error requesting password reset.');
        }
      });
  }

  submitNewPassword() {
    // Step 2: Reset password with token and new password
    const { user_id, resetToken, newPassword } = this.forgotPasswordObj;
    this.resetPasswordService.resetPassword(user_id, resetToken, newPassword).subscribe(
      (response) => {
        alert('Password reset successful');
        this.showResetPassword = false;
        this.router.navigate(['/login']); // Redirect to login after successful reset
      },
      (error) => {
        console.error('Error resetting password:', error);
        alert('Error resetting password');
      }
    );
  }
}
