import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { CommonSerivce } from '../services/common.service';
import { IHttpSimpleRes } from '../interfaces/app.interfaces';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  roles: string[] = [];
  editData: any;
  isEdit: boolean = false;
  showLoader: boolean = false;
  addError: string = '';
  addSuccess: string = '';
  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonSerivce) { }

  ngOnInit() {
    this.roles = ['Developer', 'Tester', 'Other']
    this.addEmployeeForm = new FormGroup({
      "empId": new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      "name": new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      "designation": new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      "domain": new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      "role": new FormControl('', [Validators.required]),
      // "roleType": new FormArray([])
    });
    if (window.history.state && window.history.state.editData) {
      this.isEdit = true;
      this.editData = { ...window.history.state.editData };
      let formObj = {
        "empId": +this.editData.empId,
        "name": this.editData.name,
        "domain": this.editData.domain,
        "designation": this.editData.designation,
        "role": this.editData.role
      };
      if (this.editData.role === "Tester") {
        this.addEmployeeForm.addControl("testingType", new FormControl('auto', Validators.required))
        formObj['testingType'] = this.editData.testType;
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
  addSubmit() {
    this.addError = '';
    this.addSuccess = '';
    let reqObj: any = {
      empId: this.addEmployeeForm.value.empId,
      name: this.addEmployeeForm.value.name,
      domain: this.addEmployeeForm.value.domain,
      designation: this.addEmployeeForm.value.designation,
      role: this.addEmployeeForm.value.role,
      action: this.isEdit ? 'edit' : 'add',
      testType: this.addEmployeeForm.value.testingType || ''
    };
    this.isEdit ? (reqObj.id = this.editData._id) : null;
    if (this.addEmployeeForm.valid) {
      this.showLoader = true;
      this.commonService.commonHttp('POST', '/emp/action', reqObj).subscribe((response: IHttpSimpleRes) => {
        this.showLoader = false;
        if (response.rc === '0') {
          this.isEdit?(this.addSuccess = "Modified successfully"):(this.addSuccess = "Added successfully")
        }
        else{
          this.addError = response.message;
        }
      });
    }
  }

}
