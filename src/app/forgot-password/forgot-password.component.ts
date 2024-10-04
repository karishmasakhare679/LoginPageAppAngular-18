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
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordObj = {
    user_id: '',
    resetToken: '', // You'll need this reset token to be sent from the email link
    newPassword: ''
  };

  showForgotPassword = false;
  showResetPassword = false;  

  http = inject(HttpClient);

constructor(private router:Router , private resetPasswordService: ResetPasswordService){}

  
onForgotPassword(){
  this.showForgotPassword = true;
}
  closeForgotPassword() {
    this.showForgotPassword = false; // Close the forgot password form
  }
 
  submitForgotPassword() {debugger;
    this.http.post("http://localhost:3000/forgot-password", this.forgotPasswordObj)
      .subscribe({
        next: (res: any) => {
          alert('Reset link has been sent to your email.');
          this.closeForgotPassword();
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Error requesting password reset.');
        }
      });

      const { user_id, resetToken, newPassword } = this.forgotPasswordObj;
          // Call resetPasswordService and send user_id, resetToken, and newPassword
    this.resetPasswordService.resetPassword(user_id, resetToken, newPassword).subscribe(
      (response) => {
        alert('Password reset successful');
        this.showForgotPassword = false;
      },
      (error) => {
        console.error('Error resetting password:', error);
        alert('Error resetting password');
      }
    );

  }


}
