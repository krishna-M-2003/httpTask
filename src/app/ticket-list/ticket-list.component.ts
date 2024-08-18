import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { I_DDContactNum } from '../DDContNumData';
import { IPriority } from '../DDPriority';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgSelectModule, ReactiveFormsModule, FormsModule, FilterPipeModule, NgxPaginationModule, OrderModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent implements OnInit {

  tickets: any;
  DDContactNumber: I_DDContactNum[] = [];
  DDLabourId: any;
  DDTicketType: any;
  DDPriority: IPriority[] = [];
  DepartmentDD: any;
  DDAssignedTo: any;
  DDCategory: any;
  DDSubCategory: any;
  // npx filter G-var
  userFilter: any = {};
  // npx pagination
  itemsPerPage: number = 5;
  p: any = 1;
  totalUserList: any;
  totalCountList: number = 0;
   // npx sorting : asc, des
   orderHerder: string = '';
   isDecsOrder: boolean = true;
  // form-groupName
  allData: FormGroup = new FormGroup({});


  constructor(private _TicketService: TicketService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {

    this.allData = this.fb.group({
      CustomerType: ['', [Validators.required]],
      CustomerId: ['', [Validators.required]],
      ContractNumber: ['', [Validators.required]],
      LabourId: ['', [Validators.required]],
      TicketType: ['', [Validators.required]],
      Department: ['', [Validators.required]],
      AssignedTo: ['', [Validators.required]],
      Priority: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      SubCategory: ['', [Validators.required]],
      Subject: [''],
      Description: [''],
    });

    // this.allData.get('CustomerType')?.setValue('Individual');
    // this.allData.get('CustomerId')?.setValue('CIN0000150');

    this.getAllData();
    this.getContactNumber();
    this.getPriority();
    this.getTicketType();
    this.getAssignedTo();
    this.allData.reset();
  }

  openpopUpData() {
    this.allData.get('CustomerType')?.setValue('Individual');
    this.allData.get('CustomerId')?.setValue('CIN0000150');

  }

  openlid() {
    debugger
    let val = this.allData.get('ContractNumber')?.value;
    if (val == '' || val == null) {
      alert('Select Contract Number');
    }
  }

  closeContactNumber() {
    debugger;
    this.DDLabourId = [];
  }

  openDepartment() {
    let valDep = this.allData.get('TicketType')?.value;
    if (valDep == '' || valDep == null) {
      alert('Select Ticket Type');
    } // balance ... ex: openlid
  }

  clearTicketType() {
    debugger;
    this.DepartmentDD = [];
  }

  openCategory() {
    let valCategory = this.allData.get('Department')?.value;
    if (valCategory == '' || valCategory == null) {
      alert('select Department');
    }
  }

  clearDepartment() {
    debugger;
    this.DDCategory = [];
  }

  openSubCategory() {
    let valSubCategory = this.allData.get('Category')?.value;
    if (valSubCategory == '' || valSubCategory == null) {
      alert('select Category')
    }
  }

  // clearCategory(){debugger;
  //   this.DDSubCategory = [];
  // }

  getAllData() {
    debugger;
    this._TicketService.AllDataAPI()
      .subscribe((resp: any) => {
        this.tickets = resp.Data
        this.totalUserList = resp.length;
        this.totalCountList = resp.Data.length;
        console.log(this.totalCountList);
      });
  }

  getContactNumber() {
    this._TicketService.getDDContactNumber_API()
      .subscribe((respons: any) => {
        this.DDContactNumber = respons.Result2
      });
  }

  getLaberId(ContractNumber: any) {
    this._TicketService.getDDLaberId_API(ContractNumber)
      .subscribe((resp: any) => {
        this.DDLabourId = resp
      });
  }

  // change event
  ContractNumberChangeEvent(item: any) {
    this.allData.get('LabourId')?.reset();
    this.getLaberId(item.ContractNumber);
  }
  // change event end

  getPriority() {
    debugger;
    this._TicketService.getPriority_API()
      .subscribe((resp: any) => {
        this.DDPriority = resp.Data
      });
  }

  getTicketType() {
    this._TicketService.getTicketType_API()
      .subscribe((resp: any) => {
        this.DDTicketType = resp.Data
      });
  }

  getDepartment(ID: any) {
    this._TicketService.getDepartment_API(ID)
      .subscribe((resp: any) => {
        this.DepartmentDD = resp
      });
  }

  // change event
  TicketTypeIDChangeEvent(item: any) {
    this.allData.get('Department')?.reset();
    this.getDepartment(item.ID);
  }
  // change event end

  getAssignedTo() {
    this._TicketService.getAssignedTo_API()
      .subscribe((resp) => {
        this.DDAssignedTo = resp.Data
      });
  }

  getCategory(ID: any) {
    this._TicketService.getCategory_API(ID)
      .subscribe((resp) => {
        this.DDCategory = resp
      });
  }

  DepartmentChangeEvent(item: any) {
    this.allData.get('SubCategory')?.reset();
    this.allData.get('Category')?.reset();
    this.getCategory(item.ID);
  }

  getSubCategory(TicketGroupID: any) {
    this._TicketService.getSubCategory_API(TicketGroupID)
      .subscribe((resp) => {
        this.DDSubCategory = resp
      });
  }

  CategoryChangeEvent(item: any) {
    this.allData.get('SubCategory')?.reset();
    this.getSubCategory(item.TicketGroupID);
  }

  // routing 
  onSelect(ticket: any) {
    this.router.navigate(['/list', ticket.EnquiryId]);
  }
  // routing end 

  Submit() {
    debugger;
    this.allData.value;
    let altVal = 'ContractNumber :' + this.allData.value.ContractNumber + '\n'
      + 'LabourId :' + this.allData.value.LabourId + '\n'
      + 'TicketType :' + this.allData.value.TicketType + '\n'
      + 'Department :' + this.allData.value.Department + '\n'
      + 'AssignedTo :' + this.allData.value.AssignedTo + '\n'
      + 'Priority :' + this.allData.value.Priority + '\n'
      + 'Category :' + this.allData.value.Category + '\n'
      + 'SubCategory :' + this.allData.value.SubCategory + '\n'
      + 'Subject :' + this.allData.value.Subject + '\n'
      + 'Description :' + this.allData.value.Description;
    alert(altVal);
    debugger;
    this.allData.reset();
    this.DDLabourId = [];
    this.DepartmentDD = [];
    this.DDCategory = [];
    this.DDSubCategory = [];
  }

  onClose() {
    this.allData.reset();
    this.DepartmentDD = [];
    this.DDLabourId = [];
    this.DDCategory = [];
    this.DDSubCategory = [];
  }

  closeX() {
    this.allData.reset();
    this.DDLabourId = [];
    this.DepartmentDD = [];
    this.DDCategory = [];
    this.DDSubCategory = [];
  }

  // sorting

  sort(headerName: string) {
    debugger;
    this.isDecsOrder = !this.isDecsOrder;
    this.orderHerder = headerName;  
  }

}
