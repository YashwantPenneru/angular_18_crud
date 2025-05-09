export class EmployeeModel {
    empId: number;
    name: string;
    city: string;
    state: string;
    emailId: string;
    contactNo: string;
    address: string;
    pinCode: string;

    constructor(){
        this.address = '';
        this.city = '';
        this.emailId ='';
        this.state = '';
        this.name = '';
        this.contactNo ='';
        this.empId = 1;
        this.pinCode = '';
    }
}