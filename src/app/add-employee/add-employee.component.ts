import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isEdit: boolean = false;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.roles = ['Developer', 'Tester']
    this.addEmployeeForm = new FormGroup({
      "empId": new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      "name": new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
      "designation": new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      "domain": new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      "role": new FormControl('', [Validators.required]),
      // "roleType": new FormArray([])
    });
    if(window.history.state && window.history.state.editData){
      this.isEdit = true;
      let editData = {...window.history.state.editData};
      let formObj = {
        "empId": +editData.empId,
        "name": editData.name,
        "domain": editData.domain,
        "designation": editData.designation,
        "role": editData.role
      };
      if(editData.role === "Tester"){
        this.addEmployeeForm.addControl("testingType", new FormControl('auto', Validators.required))
        formObj['testingType'] = editData.testType;
      }
      this.addEmployeeForm.setValue(formObj);
      this.addEmployeeForm.markAllAsTouched();
      this.addEmployeeForm.updateValueAndValidity();
    }
  }
  roleChanged(data: MatSelectChange) {
    if (data.value === 'Tester') {
      this.addEmployeeForm.addControl("testingType", new FormControl('auto', Validators.required))
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
