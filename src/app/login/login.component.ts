import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonSerivce } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false
  constructor(private router: Router, private commonService: CommonSerivce) { }

  ngOnInit() {
  }

  loginSubmit(form: HTMLFormElement){
    this.submitted = true;
    if(form.form.valid){
      this.commonService.loggedIn();
      this.router.navigate(['/home']);
    }
    console.log(form);
  }

}
