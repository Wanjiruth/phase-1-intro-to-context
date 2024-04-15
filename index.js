// Function to create an employee record from an array of data
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to convert an array of arrays into an array of employee records
function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map(createEmployeeRecord);
}

// Function to record a time-in event for an employee
function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({ type: 'TimeIn', date, hour: parseInt(hour, 10) });
    return employee;
}

// Function to record a time-out event for an employee
function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({ type: 'TimeOut', date, hour: parseInt(hour, 10) });
    return employee;
}

// Function to calculate the hours worked by an employee on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

// Function to calculate the wages earned by an employee on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wagesEarned = hoursWorked * employee.payPerHour;
    return wagesEarned;
}

// Function to calculate the total wages earned by an employee for all dates
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

// Function to calculate the total payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
