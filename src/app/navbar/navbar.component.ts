import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from '../menu-item';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  authenticated = false;
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      url: '',
    },
    {
      label: 'Shop',
      icon: 'shop',
      url: 'shop',
    },
    {
      label: 'Movie',
      icon: 'video',
      url: 'product',
    },
    {
      label: 'Pages',
      icon: 'expand_more', 
      url: '',
    },
    {
      label: 'Contact',
      icon: 'contacts',
      url: 'contact',
    },
    
  ];
  pages: MenuItem[] = [
    {
      label: 'Sign In',
      icon: 'login',
      url: 'login',
    },
    {
      label: 'Logout',
      icon: 'logout',
      url: 'logout',
    },
  ];
  xsMenu: MenuItem[] = [];
  constructor(private authService: AuthService) { 
    this.initMenu();
  }

  initMenu() {
    this.menuItems.forEach(item => {
      this.xsMenu.push(item);
    });
    
    this.pages.forEach(item => {
      this.xsMenu.push(item);
    });
  }

  onLogout() {
    this.authService.logout();
    this.detectAuthenticate();
  }

  detectAuthenticate() {
    let token: any; 
    try{
      token = localStorage.getItem('user-token');
    } catch(error) {}
    this.authService.isAuth.next(this.authenticated = token ? true : false);
    this.authService.isAuth.subscribe((res) => {
      this.authenticated = res;
    });
  }

  ngOnInit(): void {
    this.detectAuthenticate();
  }
}
