// Your code here
function createEmployeeRecord(array){
 const myObject={
     //Loads Array elements into corresponding Object properties.
     firstName : array[0],
     familyName : array[1],
     title : array[2],
      payPerHour : array[3],
      //initialize empty Arrays on the properties timeInEvents and timeOutEvents.
      timeInEvents : [],
      timeOutEvents : []

 }
 return myObject;
}
    
function createEmployeeRecords(employeeData){
  let newArray=[]
  employeeData.forEach(accumulator =>{
      newArray.push(createEmployeeRecord(accumulator))
    
  })
  return newArray;

}
function createTimeInEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeRecord;
}
function hoursWorkedOnDate (employeeRecord, soughtDate){
    let inEvent = employeeRecord.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employeeRecord.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}
function wagesEarnedOnDate(employeeRecord, payDay){
    let employeWage = hoursWorkedOnDate(employeeRecord, payDay)
        * employeeRecord.payPerHour
    return parseFloat(employeWage.toString())
}
function allWagesFor(employeeRecord){
    let  validDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    let amountToPay = validDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)

    return amountToPay;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  function calculatePayroll(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor(rec)
      }, 0)
  }



