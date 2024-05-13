import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  isMenuOpen: boolean = false;
  token!: string | null;



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private authService: AuthService, private router:Router) {

  }


  ngOnInit(): void {

    this.token = localStorage.getItem('token');

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      this.token = localStorage.getItem('token');
    });

    this.isAuthenticated = localStorage.getItem('token') ? true : false;


  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);

  }

}
