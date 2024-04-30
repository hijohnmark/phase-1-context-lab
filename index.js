function createEmployeeRecord(employeeArray) {
    let employeeRecord = {}
    employeeRecord.firstName = employeeArray[0]
    employeeRecord.familyName = employeeArray[1]
    employeeRecord.title = employeeArray[2]
    employeeRecord.payPerHour = employeeArray[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord
}

function createEmployeeRecords(arrayOfArrays){
    let employeeRecords = []
    for (let i = 0; i < arrayOfArrays.length; i++){
        let employeeRecord = createEmployeeRecord(arrayOfArrays[i])
        employeeRecords.push(employeeRecord)
    }
    return employeeRecords
}

function createTimeInEvent(dateTimeString){
    let [date, time] = dateTimeString.split(" ");
    let timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(time, 10)
    }

    this.timeInEvents.push(timeInEvent);
    return this;
}

function createTimeOutEvent(dateTimeString){
    let [date, time] = dateTimeString.split(" ")
    let timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(time, 10)
    }

    this.timeOutEvents.push(timeOutEvent)
    return this
}

function hoursWorkedOnDate(date){
    let timeInDate = this.timeInEvents.find(element => element.date === date)
    let timeOutDate =  this.timeOutEvents.find(element => element.date === date)

    if (timeInDate && timeOutDate){
        let hoursWorked = (timeOutDate.hour - timeInDate.hour) / 100
        return hoursWorked
    }
    else {
        return 0
    }
}

function wagesEarnedOnDate(date){
    let hours = hoursWorkedOnDate.call(this, date)
    let wage = parseInt(this.payPerHour, 10)
    return hours * wage
}

// function allWagesFor(){
//     let totalWages = employeeRecord.timeInEvents.reduce((acc, timeInEvent) => {
//       let date = timeInEvent.date
//       let wagesEarned = wagesEarnedOnDate(employeeRecord, date)
//       return acc + wagesEarned
//     }, 0)
  
//     return totalWages
//   }

function calculatePayroll(employeeRecords){
    let totalPayroll = employeeRecords.reduce((acc, employeeRecord) => {
        let wages = allWagesFor.call(employeeRecord)
        return acc + wages
    }, 0)

    return totalPayroll
}

function findEmployeeByFirstName(srcArray, firstName) {
    const employee = srcArray.find(employee => employee.firstName === firstName);
    if (employee) {
      return employee;
    } else {
      return undefined;
    }
  }


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(e => e.date)

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

