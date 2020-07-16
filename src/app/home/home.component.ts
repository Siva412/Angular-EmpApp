import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router }  from '@angular/router';
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
  showModal: boolean = false;
  modalData: IEmployee;
  constructor(private router: Router) { }

  ngOnInit() {
    this.employeeList.data = [
      {name: "John", empId: "123", role: "Developer", designation:"ITA", domain: "IT"},
      {name: "Elon", empId: "124", role: "Tester", designation:"ITA", domain: "IT", testType: "auto"},
      {name: "Larry", empId: "125", role: "Developer", designation:"ITA", domain: "IT"},
      {name: "Hawking", empId: "126", role: "Developer", designation:"ITA", domain: "IT"},
      {name: "Tesla", empId: "127", role: "Developer", designation:"ITA", domain: "IT"}
    ];
    this.columnList = ['empId', 'name', 'role', 'domain', 'edit', 'delete'];
  }
  filterChange(filterData: string):void{
    this.employeeList.filter = filterData.trim().toLowerCase();
  }
  editEmployee(empData, type){
    if(type === 'edit'){
      this.router.navigate(['addAction'],{state:{"editData": empData}});
    }
    else{
      this.showModal = true;
      this.modalData = empData;
    }
  }
  closeModal(type: string){
    this.showModal = false;
    if(type === 'ok'){
      let modArray = this.employeeList.data.filter(a => {
        return a.empId !== this.modalData.empId;
      });
      this.employeeList.data = modArray;
    }
  }
  navigateToAdd(){
    this.router.navigate(['/addAction']);
  }
}
