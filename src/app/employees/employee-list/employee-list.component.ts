import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  list: Employee[];
  filteredList: any[];
  page = 1;
  pageSize = 4;
  collectionSize;
  constructor(private employeeService: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) {}
    
    ngOnInit() {
      this.employeeService.getEmployees().subscribe((actionArray) => {
        this.list = actionArray.map((item) => {
          return {
            id: item.payload.doc.id,
            ...(item.payload.doc.data() as Employee),
          };
          // console.log(item);
        });
        this.collectionSize = this.list.length;
        this.filteredList = this.list;
        this.refreshEmployees()
      });

     
  }

  onEdit(emp: Employee) {
    this.employeeService.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if( confirm("Are you sure to delete this record")) {
      this.firestore.doc('employees/' + id).delete();
      this.toastr.warning('Deleted successfully', 'EMP. Register', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing'
      })
    }
      }

      filter(query: string){
        this.filteredList = (query) ?
        this.list.filter(emp => emp.fullName.toLowerCase().includes(query.toLowerCase())) :
        this.list;
      }

      refreshEmployees() {
        this.filteredList = this.list
          .map((emp, i) => ({id: i + 1, ...emp}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      }
}
