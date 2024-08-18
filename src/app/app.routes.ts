import { Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

export const routes: Routes = [
    
    { path: '', redirectTo: '/list', pathMatch:'full'},
    { path: 'list', component: TicketListComponent},
    {path: 'list/:EnquiryId', component: TicketDetailComponent}

];
