import { NgModule } from '@angular/core';

// Import the EmployeeRoutingModule
import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeesComponent } from './list-employees.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    // Add EmployeeRoutingModule to the imports array
    EmployeeRoutingModule,
    SharedModule
  ],
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent
  ]
})
export class EmployeeModule { } 