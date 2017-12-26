//1. Import all dependencies
import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Employee } from "./emp.model";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { CsvService } from "angular2-json2csv";
import { Angular2Csv } from "angular2-csv/Angular2-csv";
import { setTimeout } from "timers";
import * as json2csv from 'json2csv';
import * as Papa from 'papaparse';

//2. The service class
@Injectable()
export class EmployeeService {
  //3. The local private variable for  storing the URL of the REST API
  private servUrl = "http://localhost:4040/api/EmployeeList/api/employees";
  //4. Passsing the Http dependency to the constructor to access Http functions
  constructor(private http: Http, private csvService: CsvService) {}
  //private employees: Array<Employee>;
  //5. Function to return the Observable response containing all Employees
  getEmployees(): Observable<Response> {
    return this.http.get(this.servUrl);
  }
  //6. Function to perform POST operation to create a new employee
  addEmployee(emp: Employee): Observable<Response> {
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.servUrl, JSON.stringify(emp), options);
  }
  //7. Function to update Employee using PUT operation
  updateEmployee(id: string, emp: Employee): Observable<Response> {
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });
    return this.http.put(this.servUrl + `/` + id, JSON.stringify(emp), options);
  }
  //8. Function to remove the Employee using DELETE operation
  deleteEmployee(id: string): Observable<Response> {
    return this.http.delete(this.servUrl + `/` + id);
  }
  exportdata() {
    //return this.http.get(this.servUrl+'/export');
    return this.http
      .get("http://localhost:4040/api/EmployeeList/api/employees/export")
      .map(resdata => {
          console.log("Received JSON is"+ resdata.json());
          
           //var fields = ['field1', 'field2', 'field3'];
           //var fields = ['field1', 'field2', 'field3'];
           //      //res.json(employees);
           // //    try {
           //var result = json2csv({ data: resdata.json(), fields: fields });
        //   try {
        //     var result =  Papa.unparse(resdata);
        //     console.log("converted csv is"+result);
        //   } catch (err) {
        //     // Errors are thrown for bad options, or if the data is empty and no fields are provided.
        //     // Be sure to provide fields if it is possible that your data array will be empty.
        //     console.error(err);
        //   }
        // console.log("res we got is" + JSON.stringify(res));
        //console.log("final res is"+req.csv(resdata);
        // setTimeout(() => {
        //   console.log("resdata is"+resdata);
        //   this.csvService.download(resdata, "csvdata");
          
        // }, 5000);
        //var data = JSON.stringify(res);
        // console.log("res data is" + res);

        // var inbound = [
        //   {
        //     name: "Test 1",
        //     age: 13,
        //     average: 8.2,
        //     approved: true,
        //     description: "using 'Content here, content here' "
        //   },
        //   {
        //     name: "Test 2",
        //     age: 11,
        //     average: 8.2,
        //     approved: true,
        //     description: "using 'Content here, content here' "
        //   },
        //   {
        //     name: "Test 4",
        //     age: 10,
        //     average: 8.2,
        //     approved: true,
        //     description: "using 'Content here, content here' "
        //   }
        // ];
        // console.log("inbound data is"+inbound);
        // setTimeout(() =>{
        //     new Angular2Csv(inbound, "My Report");
            // var options = {
            //   fieldSeparator: ",",
            //   quoteStrings: '"',
            //   decimalseparator: ".",
            //   showLabels: true,
            //   showTitle: true,
            //   useBom: true
            // };
        // },5000)
        //console.log("inbound data is" + inbound);

        new Angular2Csv( resdata.json(), 'MyReport');

        // Angular2Csv(data, filename, options);
        // Angular2Csv(res, "csvdata", options);
      });
  }
}
