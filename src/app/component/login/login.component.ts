import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    email:'',
    password:''
  }

  constructor(private authService:AuthService, private router:Router) { }

  login(): void {
    this.authService.login(this.loginData).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('access',res.rol )
        this.authService.setAuthenticated(true);
        alert(res.message);
        this.router.navigate(['/home']);
      },
      (err) => console.log(err)
    );
  }
  ngOnInit(): void {
  }

}
