import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonSerivce } from '../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleMenu = new EventEmitter<void>();
  loggedInFlag: boolean = false;
  loggedInSubscrition: Subscription;
  constructor(private router: Router, private commonService: CommonSerivce) { }

  ngOnInit() {
    this.loggedInFlag = this.commonService.getLoggedInFlag();
    this.loggedInSubscrition = this.commonService.getLoggedInSub().subscribe((data: boolean) => {
      this.loggedInFlag = data;
    });
  }
  
  ngOnDestroy(){
    this.loggedInSubscrition.unsubscribe();
  }
  toggleSideMenu(){
    this.toggleMenu.emit();
  }
  logout(){
    this.commonService.loggedOut();
    this.router.navigate(['/login']);
  }
  navigateHome(){
    this.router.navigate(['/home'])
  }
}
