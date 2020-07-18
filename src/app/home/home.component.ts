import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee, IHttpRes, IHttpSimpleRes } from '../interfaces/app.interfaces';
import { MatTableDataSource } from '@angular/material';
import { CommonSerivce } from '../services/common.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  employeeList = new MatTableDataSource<IEmployee>();
  columnList: string[] = [];
  showModal: boolean = false;
  showLoader: boolean = false;
  modalData: IEmployee;
  constructor(private router: Router, private commonService: CommonSerivce, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.employeeList.data = [
    //   {name: "John", empId: "123", role: "Developer", designation:"ITA", domain: "IT"},
    //   {name: "Elon", empId: "124", role: "Tester", designation:"ITA", domain: "IT", testType: "auto"},
    //   {name: "Larry", empId: "125", role: "Developer", designation:"ITA", domain: "IT"},
    //   {name: "Hawking", empId: "126", role: "Developer", designation:"ITA", domain: "IT"},
    //   {name: "Tesla", empId: "127", role: "Developer", designation:"ITA", domain: "IT"}
    // ];
    this.columnList = ['empId', 'name', 'role', 'domain', 'edit', 'delete'];
    this.showLoader = true;
    this.commonService.commonHttp("GET", "/emp").subscribe((response: IHttpRes) => {
      this.showLoader = false;
      if (response.rc === '0') {
        this.employeeList.data = response.empList;
      }
    })
  }
  filterChange(filterData: string): void {
    this.employeeList.filter = filterData.trim().toLowerCase();
  }
  editEmployee(empData, type) {
    if (type === 'edit') {
      this.router.navigate(['addAction'], { state: { "editData": empData } });
    }
    else {
      this.showModal = true;
      this.modalData = empData;
    }
  }
  closeModal(type: string) {
    this.showModal = false;
    if (type === 'ok') {
      this.showLoader = true;
      this.commonService.commonHttp('POST', '/emp/action', { id: this.modalData._id, action: 'delete' }).subscribe((response: IHttpSimpleRes) => {
        this.showLoader = false;
        if (response.rc === '0') {
          this.snackBar.open("Deleted successfully", null, {duration: 2000});
        }
        else{
          this.snackBar.open(response.message, null, {duration: 2000});
        }
      })
      let modArray = this.employeeList.data.filter(a => {
        return a.empId !== this.modalData.empId;
      });
      this.employeeList.data = modArray;
    }
  }
  navigateToAdd() {
    this.router.navigate(['/addAction']);
  }
}
