var mongooseDrv = require("mongoose"); //Get the Mongoose Driver
var csv = require("csv-express");
var json2csv = require('json2csv');
//mongooseDrv.Promise = global.Promise;
// mongooseDrv.connect('mongodb://localhost/EmployeeDB');
// var db = mongooseDrv.Connection; //The Connection

// if (db == 'undefined') {
//     console.log("The Connecion issues");
// }

//The Schema for the Data to be Stored Front-End (Node)
var EmployeeInfoSchema = mongooseDrv.Schema({
  EmpNo: String,
  EmpName: String,
  Salary: String,
  DeptName: String,
  Designation: String
});
// Linking for the MongoDB Collection If Collection is present thne link else
// creae new
var EmployeeInfoModel = mongooseDrv.model("EmployeeInfoes", EmployeeInfoSchema);

//retrieve all records from the database
exports.get = function(req, resp) {
  EmployeeInfoModel.find().exec(function(error, res) {
    //console.log(EmployeeInfoModel.log);
    if (error) {
      resp.send(500, { error: error });
    } else {
      resp.send(res);
    }
  });
};

//Add a new Record in the Employee Model
exports.add = function(request, response) {
  console.log(request.body);
  var newEmp = {
    EmpNo: request.body.EmpNo,
    EmpName: request.body.EmpName,
    Salary: request.body.Salary,
    DeptName: request.body.DeptName,
    Designation: request.body.Designation
  };
  console.log(newEmp);

  EmployeeInfoModel.create(newEmp, function(addError, addedEmp) {
    if (addError) {
      response.send(500, { error: addError });
    } else {
      response.send({ success: true, emp: addedEmp });
    }
  });
};

exports.update = function(request, response) {
  var id = request.params.Id;
  var updEmp = {
    EmpNo: request.body.EmpNo,
    EmpName: request.body.EmpName,
    Salary: request.body.Salary,
    DeptName: request.body.DeptName,
    Designation: request.body.Designation
  };
  console.log(" in update id " + id + JSON.stringify(updEmp));
  EmployeeInfoModel.update(
    {
      _id: id
    },
    updEmp,
    function(remError, updatedEmp) {
      if (remError) {
        response.send(500, { error: remError });
      } else {
        response.send({ success: 200 });
      }
    }
  );
};

exports.delete = function(request, response) {
  var id = request.params.Id;
  console.log("id " + id);
  EmployeeInfoModel.remove(
    {
      _id: id
    },
    function(remError, addedEmp) {
      if (remError) {
        response.send(500, { error: remError });
      } else {
        response.send({ success: 200 });
      }
    }
  );
  
};
exports.exportdata = (req, res,next) => {
    // console.log("Request in server API Controller");
    // var filename = "emp.csv";
    // var dataArray;

    // EmployeeInfoModel.find().lean().exec({}, function(err, employees) {
    //     //console.log("Employees found is"+employees)
    //     var fields = ['field1', 'field2', 'field3'];
    //      //res.json(employees);
    // //    try {
    //       //var result = json2csv({ data: employees, fields: fields });
    //       console.log("csv result is"+ employees[0]);
    EmployeeInfoModel.find({},(error,data)=>{
        if(error){
          res.status(201).send("error while converting to csv");
        }
        //console.log("found emp"+data);
        res.json(data);
    });
          
    //       //res.send(result);
    //    } catch (err) {
    //      // Errors are thrown for bad options, or if the data is empty and no fields are provided.
    //      // Be sure to provide fields if it is possible that your data array will be empty.
    //      console.error(err);
    //    }
        // console.log(`data found is ${JSON.stringify(employees)}` );
        // if (err) res.send(err);
        // res.statusCode = 200;
        // //res.json(employees);
        // //res.csv([ { name: "joe", id: 1 }]);
        //  res.setHeader("Content-Type", "text/csv");
        //  //res.setHeader("Content-Disposition", "attachment; filename=" + filename);
        //  res.csv(employees, true);
          //res.send(employees);
      //});
};
