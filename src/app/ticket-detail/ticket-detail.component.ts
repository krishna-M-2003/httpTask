import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss'
})
export class TicketDetailComponent implements OnInit {

  public tickets: any = [];
  // CustomerId: string | null = null;
  enquiryId: string | null = null;
  filterData: any;
  usersList: any;

  constructor(private route: ActivatedRoute, private _TicketService: TicketService, private router: Router) { }

  ngOnInit() {
 

      this.displayDetails();
  }

  displayDetails(){
   
    debugger;
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        debugger;
        this.enquiryId = params.get('EnquiryId')
      });
      
    this._TicketService.AllDataAPI()
          .subscribe((resp: any) => {
            this.tickets = resp.Data;

            this.filterData = this.tickets.filter((x: any) => {
            return x.EnquiryId == this.enquiryId;
            });
            this.filterData=this.filterData[0];
            console.log(this.filterData);
       });
  }

  goToListPage(){
    this.router.navigate(['/list']);
  }
}
