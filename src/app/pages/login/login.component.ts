import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    "EmailId": "",
    "Password": ""
  }

  http = inject(HttpClient);
constructor (private route:Router){}

  onLogin()
  {debugger
    this.http.post("https://freeapi.miniprojectideas.com/api/User/Login",this.loginObj).subscribe((res:any)=>{
      if(res.result){
        alert('Login  successfull');
        localStorage.setItem("angular18Login",this.loginObj.User);
        this.route.navigateByUrl("dashboared");
      }
      else{
        alert('please check userid or password ');
      }
    });
  }
}
