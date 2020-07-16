import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonSerivce } from '../services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  formSubmitted: boolean = false;
  constructor(private fb: FormBuilder, private commonService: CommonSerivce) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  signupSubmit(){
    this.formSubmitted = true;
    if(this.signUpForm.valid){
      this.commonService.signUpApi({
        name: this.signUpForm.value.name,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      }).subscribe((response: any) => {
        if(response.rc === '0'){
          this.signUpForm.reset();
        }
      })
    }
  }
}
