import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { BloodRequest } from '../core/typeFiles/blood-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-home',
  templateUrl: './request-home.component.html',
  styleUrls: ['./request-home.component.scss']
})
export class RequestHomeComponent implements OnInit {

  public bloodRequestList: BloodRequest[] = []
  isNewFormVisible = false
  openforEdit= false
  public formData:BloodRequest
  
  constructor(private data: DataService, private formBuilderObject: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.data.getBloodRequestList().subscribe( dataResponse => {
      this.bloodRequestList = dataResponse as BloodRequest[]
    })
  }

  showBRform(dataFormValue,indexValue){
    if(indexValue == -1)
      this.formData = <BloodRequest>{}
    else
      this.formData = dataFormValue
    this.isNewFormVisible = !this.isNewFormVisible
  }

  removeDialog(){
    this.data.getBloodRequestList().subscribe( dataResponse => {
      this.bloodRequestList = dataResponse as BloodRequest[]
      this.isNewFormVisible = false;
    })
  }

}
