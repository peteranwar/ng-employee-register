import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
form: FormGroup;
   
  
  constructor(public service: EmployeeService,
              private fireStore: AngularFirestore,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.resetForm();

    this.form = new FormGroup({
      fullName: new FormControl('', { validators: Validators.required}),
      position: new FormControl('', { validators: Validators.required}),
      empCode: new FormControl('', { validators: Validators.required}),
      mobile: new FormControl ('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      id: new FormControl('', ),
    
    })
  }

  get f(){
    return this.form.controls;
  }

  resetForm(form?: FormGroup) {
    if (form != null)
    form.reset();
    this.service.formData = {
      id: null,
      fullName: '',
      position: '',
      empCode: '',
      mobile: '',
    }
  }

  onSubmit(form: FormGroup) {
     let data = Object.assign({},form.value);
      delete data.id;
    if (form.value.id == null)
     this.fireStore.collection('employees').add(data);
    else
    this.fireStore.doc('employees/'+form.value.id).update(data)
     this.resetForm(form);
     this.toastr.success('Submitted successfully', 'EMP. Register', {
      progressBar: true,
     })
  }
}
 