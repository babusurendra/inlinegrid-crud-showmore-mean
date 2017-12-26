import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule }  from '@angular/http';
import {EmployeeService} from './emp.service'
import { 
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule
 } from '@angular/material';
 import {CsvService} from 'angular2-json2csv';
import { routes } from './emp.routes';

import {  EmpComponent} from './emp.component';


@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    EmpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
    // ApolloModule.forRoot(client)
  ],
  providers:[EmployeeService,CsvService]
})
export class EmpModule {
  public static routes = routes;
}
