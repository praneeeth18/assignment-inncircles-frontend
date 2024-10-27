import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navItems: { label: string, route: string }[] = [];
  userRoles: string[] = [];
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loginStatus$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.userRoles = this.authService.getUserRoles();
        this.setNavItemsBasedOnRole();
      } else {
        this.clearNavItems();
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.isLoggedIn) {
          this.setNavItemsBasedOnRole();
        }
      }
    });
  }

  setNavItemsBasedOnRole() {
    this.navItems = []; 

    if (this.userRoles.includes('Admin')) {
      this.navItems.push(
        { label: 'Issues', route: '/issues' },
        { label: 'Users', route: '/users' },
        { label: 'Roles', route: '/roles' },
        { label: 'Profile', route: '/profile' }
      );
    } else {
      this.navItems.push(
        { label: 'Issues', route: '/issues' },
        { label: 'Profile', route: '/profile' }
      );
    }
  }

  clearNavItems() {
    this.userRoles = [];
    this.navItems = [];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
