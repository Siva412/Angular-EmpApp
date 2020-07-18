import { Component, OnInit } from '@angular/core';
import { CommonSerivce } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'emp-management';
  constructor(private commonService: CommonSerivce){}
  ngOnInit(){
    if(localStorage.getItem('isLogin') === 'y'){
      let token = localStorage.getItem('token');
      this.commonService.loggedIn(token);
    }
  }
}
