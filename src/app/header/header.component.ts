import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>();
  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigateAdd(){
    this.router.navigate(['addAction']);
  }
  toggleSideMenu(){
    this.toggleMenu.emit();
  }
}
