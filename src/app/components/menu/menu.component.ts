import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from '../../interfaces/menu-item';
import { NavigationEnd, Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  expandedPanels: { [id: number]: boolean } = {};
  tenantName: string = '';

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe(menuData => {
      this.menuItems = this.menuService.buildMenuHierarchy(menuData);

      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        this.updateExpandedPanels();
      });

      this.updateExpandedPanels();
    });

    this.tenantName = sessionStorage.getItem('tenantName') || '';
  }

  navigateTo(route?: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }

  updateExpandedPanels() {
    const activeRoute = this.router.url;
    this.expandedPanels = {};

    this.menuItems.forEach(menu => {
      if (menu.children?.some(child => activeRoute.includes(child.route || ''))) {
        this.expandedPanels[menu.id] = true;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
