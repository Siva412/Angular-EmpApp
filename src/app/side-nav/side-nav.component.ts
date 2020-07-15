import { Component, OnInit } from '@angular/core';
import { CommonSerivce } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private commonService: CommonSerivce, private router: Router) { }

  ngOnInit() {
  }
  logout(){
    this.commonService.loggedOut();
    this.router.navigate(['/login']);
  }
}
