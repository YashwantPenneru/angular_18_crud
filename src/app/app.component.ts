import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  employeeForm: FormGroup = new FormGroup({});

  employeeObj: EmployeeModel = new EmployeeModel();

  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm()
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      address: new FormControl(this.employeeObj.address,[Validators.required]),
      emailId: new FormControl(this.employeeObj.emailId,[Validators.required,Validators.email]),
      pinCode: new FormControl(this.employeeObj.pinCode,[Validators.required,Validators.minLength(6)]),
      contactNo: new FormControl(this.employeeObj.contactNo,[Validators.required,Validators.minLength(10)]),
    })
  }

  onSave() {
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length +1);
      this.employeeList.unshift(this.employeeForm.value)
    } else {
      this.employeeForm.controls['empId'].setValue(1); 
      this.employeeList.unshift(this.employeeForm.value)
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
    this.reset()
  }

  onEdit(item:EmployeeModel){
    this.employeeObj = item;
    this.createForm()
  }

  onUpdate(){
    const record = this.employeeList.find(m=>m.empId ==this.employeeForm.controls['empId'].value);
    if(record != undefined){
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
   this.reset()
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure you want to Delete");
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empId == id);
      this.employeeList.splice(index,1)
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
  }

  reset(){
    this.employeeObj = new EmployeeModel()
    this.createForm()
  }
}
