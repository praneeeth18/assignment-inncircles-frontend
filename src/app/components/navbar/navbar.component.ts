import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // Fix the typo here (styleUrl -> styleUrls)
})
export class NavbarComponent implements OnInit {
  navItems: any[] = [];
  userRoles: string[] = [];
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRoles = this.authService.getUserRoles();
    this.isLoggedIn = this.authService.getAccessToken() !== null;
    this.setNavItemsBasedOnRole();
  }

  setNavItemsBasedOnRole() {
    this.navItems = []; 

    if (this.userRoles.includes('Admin')) {
      this.navItems.push(
        { label: 'Dashboard', route: '/dashboard' },
        { label: 'Users', route: '/users' },
        { label: 'Settings', route: '/settings' }
      );
    } else if (this.userRoles.includes('User')) {
      this.navItems.push(
        { label: 'Dashboard', route: '/dashboard' },
        { label: 'Profile', route: '/profile' }
      );
    } else {
      this.navItems.push(
        { label: 'Home', route: '/home' }
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
