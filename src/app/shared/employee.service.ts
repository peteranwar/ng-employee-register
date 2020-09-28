import { Employee } from './employee.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  formData: Employee;

  constructor(private firestore: AngularFirestore) { }



  getEmployees() {
    return this.firestore.collection('employees').snapshotChanges();
  }
}
