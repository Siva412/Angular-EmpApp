import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonSerivce } from '../services/common.service';
import { IHttpSimpleRes } from '../interfaces/app.interfaces';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm',{static: true}) form: NgForm;
  submitted: boolean = false;
  loginError: string = '';
  showLoader: boolean = false;
  constructor(private router: Router, private commonService: CommonSerivce) { }
  ngOnInit(){
    this.form.valueChanges.subscribe(res => {
      this.loginError?(this.loginError = ''):null;
    })
  }
  loginSubmit(form: HTMLFormElement) {
    this.submitted = true;
    if (form.valid) {
      this.showLoader = true;
      this.commonService.loginApi({
        email: form.value.username,
        password: form.value.password
      }).subscribe((response: IHttpSimpleRes) => {
        this.showLoader = false;
        if (response.rc === '0') {
          this.commonService.loggedIn();
          this.router.navigate(['/home']);
        }
        else {
          this.loginError = response.message || '';
        }
      },
      error => {
        this.showLoader = false;
        this.loginError = "Sorry something went wrong";
      });
    }
  }

}
