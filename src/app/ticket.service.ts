import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  private _API: string = "https://test.arco.sa//api/GetMyTicket?CustomerId=CIN0000150";

  constructor(private http: HttpClient) { }

  AllDataAPI(): Observable<any> {
    return this.http.get<any>(this._API);
  }

  getDDContactNumber_API(): Observable<any> {
    let ContactNum_API: any = `https://test.arco.sa/api/GetTicketCustomerDetails?CustomerId=CIN0000150`;
    return this.http.get<any>(ContactNum_API);
  }

  getDDLaberId_API(ContractNumber: any): Observable<any> {
    let LabourId_API: any = `https://test.arco.sa//api/GetTicketIndContractAllEmployee?CustomerId=CIN0000150&ContractId=${ContractNumber}`;
    return this.http.get<any>(LabourId_API);
  }

  getPriority_API(): Observable<any> {
    let Priority_API: any = `https://test.arco.sa//api/PriorityList`;
    return this.http.get<any>(Priority_API);
  }

  getTicketType_API(): Observable<any> {
    let TicketType_API: any = `https://test.arco.sa//api/TickettypeList`;
    return this.http.get<any>(TicketType_API);
    }

    getDepartment_API(TicketTypeID: any): Observable<any>{
      let Department_API: any = `https://test.arco.sa//api/GetTicketAssignedToGroupByTicketTypeId?TicketTypeID=${TicketTypeID}`;
      return this.http.get<any>(Department_API);
    }

    getAssignedTo_API(): Observable<any>{
      let AssignedTo_API: any = `https://test.arco.sa//api/assigntoList`;
      return this.http.get<any>(AssignedTo_API);
    }

    getCategory_API(TicketTypeID: any): Observable<any>{
      let Category_API: any = `https://test.arco.sa//api/GetTicketGroupByDepatmentId?TicketAssignGroupId=${TicketTypeID}`;
      return this.http.get<any>(Category_API);
    }

    getSubCategory_API(TicketGroupID: any): Observable<any>{
      let SubCategory_API: any = `https://test.arco.sa/api/SubGroupByGroup?id=${TicketGroupID}`;
      return this.http.get<any>(SubCategory_API);
    }
}
