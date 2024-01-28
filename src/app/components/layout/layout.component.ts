import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { PAGES } from '../../constants/pages';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {

  PAGES = PAGES

  @Output() menuClick = new EventEmitter();
  @ViewChild('drawer') drawer!: MatDrawer;

  toggleDrawer() {
    this.menuClick.emit();
    this.drawer.toggle();
    console.log("emit")
  }
}
