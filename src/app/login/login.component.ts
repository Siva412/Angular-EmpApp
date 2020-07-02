import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false
  constructor(private router: Router) { }

  ngOnInit() {
  }

  loginSubmit(form: HTMLFormElement){
    this.submitted = true;
    if(form.form.valid){
      this.router.navigate(['/home']);
    }
    console.log(form);
  }

}
