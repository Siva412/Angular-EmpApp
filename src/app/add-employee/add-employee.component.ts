import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  roles: string[] = [];
  constructor() { }

  ngOnInit() {
    this.roles = ['Developer', 'Tester']
    this.addEmployeeForm = new FormGroup({
      "empId": new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      "name": new FormControl('', [Validators.required, Validators.maxLength(50)]),
      "designation": new FormControl('', [Validators.required]),
      "domain": new FormControl('', [Validators.required]),
      "role": new FormControl('', [Validators.required]),
      "roleType": new FormArray([])
    });
  }
  roleChanged(data: MatSelectChange) {
    if (data.value === 'Tester') {
      this.addEmployeeForm.addControl("testingType", new FormControl())
    }
    else {
      this.addEmployeeForm.removeControl("testingType");
    }
  }
  get roleFormArray() {
    return this.addEmployeeForm.get("roleType") as FormArray;
  }
  addSubmit(){
    console.log(this.addEmployeeForm.value);
  }

}
