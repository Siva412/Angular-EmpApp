import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IEmployee } from '../interfaces/app.interfaces';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  employeeList = new MatTableDataSource<IEmployee>();
  columnList: string[] = [];
  constructor() { }

  ngOnInit() {
    this.employeeList.data = [
      {name: "John", empId: "123", designation: "developer", domain: "IT"},
      {name: "Elon", empId: "123", designation: "tester", domain: "IT"},
      {name: "Larry", empId: "123", designation: "developer", domain: "IT"},
      {name: "Hawking", empId: "123", designation: "developer", domain: "IT"},
      {name: "Tesla", empId: "123", designation: "developer", domain: "IT"}
    ];
    this.columnList = ['empId', 'name', 'designation', 'domain', 'edit'];
  }
  filterChange(filterData: string):void{
    this.employeeList.filter = filterData.trim().toLowerCase();
  }
}
