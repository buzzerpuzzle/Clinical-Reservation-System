const express = require('express')
const cors = require('cors'); 
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const path = require('path'); 
const stringHash = require("string-hash");
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false  }))
app.use(cors());

function updateCalendarTime(doctorToCalendarTime, patient){
    var doctorID = parseInt(patient.getDoctorID());
    if(doctorToCalendarTime.has(doctorID)){
        if(doctorToCalendarTime.get(doctorID).has(patient.getDate())){
            if(doctorToCalendarTime.get(doctorID).get(patient.getDate()).has(patient.getTime())){
                var val = doctorToCalendarTime.get(doctorID).get(patient.getDate()).get(patient.getTime()) + 1; 
                doctorToCalendarTime.get(doctorID).get(patient.getDate()).set(patient.getTime(), val); 
            }
            else{
                doctorToCalendarTime.get(doctorID).get(patient.getDate()).set(patient.getTime(), 1); 
            }
        }
        else{
            doctorToCalendarTime.get(doctorID).set(patient.getDate(), new Map());
            doctorToCalendarTime.get(doctorID).get(patient.getDate()).set(patient.getTime(), 1); 
        }   
    }
    else{
        doctorToCalendarTime.set(doctorID, new Map());
        doctorToCalendarTime.get(doctorID).set(patient.getDate(), new Map());
        doctorToCalendarTime.get(doctorID).get(patient.getDate()).set(patient.getTime(), 1); 
    }   
    return doctorToCalendarTime;
}

function updateCalendar(doctorToCalendar, patient){
    var doctorID = parseInt(patient.getDoctorID());
    if(doctorToCalendar.has(doctorID)){
        if(doctorToCalendar.get(doctorID).has(patient.getDate())){
            doctorToCalendar.get(doctorID).get(patient.getDate()).push(patient);
        }
        else{
            doctorToCalendar.get(doctorID).set(patient.getDate(), [patient]);
        }   
    }
    else{
        doctorToCalendar.set(doctorID, new Map());
        doctorToCalendar.get(doctorID).set(patient.getDate(), [patient]);
    }   
    return doctorToCalendar;
}

// Data Structure 
// Doctor
// We could use doctorID map to the full information of doctor.
var doctorList = new Map();
class Doctor {
    constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;     
    }
    getFirstName() {
            return `${this.firstName}`
    }
    getLastName() {
            return `${this.lastName}`
    }
};
console.log("DoctorID");
// Dummy Data of doctor for reservation.
doctor1 = new Doctor('LIHSING', 'LIN');
doctor2 = new Doctor('LEN', 'LIN');
doctorID = doctor1.getFirstName() + doctor1.getLastName();
doctorID = stringHash(doctorID);
console.log(doctor1.getFirstName() + " " + doctor1.getLastName());
console.log(doctorID);
doctorList.set(doctorID, doctor1);
doctorID = doctor2.getFirstName() + doctor2.getLastName();
doctorID = stringHash(doctorID);
console.log(doctor2.getFirstName() + " " + doctor2.getLastName());
console.log(doctorID);
doctorList.set(doctorID, doctor2);
console.log("\n");

// Appointment
// We could use appointmentID map the detail appointment information for patient.
var patientList = new Map();
class Appointment {
    constructor(firstName, lastName, date, time, kind, doctorID) {
            this.firstName = firstName;
            this.lastName = lastName;    
            this.date = date;
            this.time = time;
            this.kind = kind;
            this.doctorID = doctorID;
    }
    getFirstName() {
            return `${this.firstName}`
    }
    getLastName() {
            return `${this.lastName}`     
    }
    getDate() {
            return `${this.date}`     
    }
    getTime() {
            return `${this.time}`     
    }
    getKind() {
        return `${this.kind}`
    }
    getDoctorID(){
        return `${this.doctorID}`
    }
};

console.log("AppointmentID");
// Dummy Data for appointment
patient1 = new Appointment('Tommy', 'Wang', '20200112', '1500', 0, '3905040912');
patient2 = new Appointment('David', 'Chen', '20200112', '1500', 1, '3905040912');
patient3 = new Appointment('Donald', 'Trump', '20200112', '1500', 0, '2783010089');
appointmentID = patient1.getFirstName() + patient1.getLastName() + patient1.getDate() + patient1.getTime();
appointmentID = stringHash(appointmentID);

console.log(patient1.getFirstName() + " " + patient1.getLastName() + " " + patient1.getDate() + " " + patient1.getTime());
console.log(appointmentID);
patientList.set(appointmentID, patient1);
appointmentID = patient2.getFirstName() + patient2.getLastName() + patient2.getDate() + patient2.getTime();
appointmentID = stringHash(appointmentID);
console.log(patient2.getFirstName() + " " + patient2.getLastName() + " " + patient2.getDate() + " " + patient2.getTime());
console.log(appointmentID);
patientList.set(appointmentID, patient2);
appointmentID = patient3.getFirstName() + patient3.getLastName() + patient3.getDate() + patient3.getTime();
console.log(patient3.getFirstName() + " " + patient3.getLastName() + " " + patient3.getDate() + " " + patient3.getTime());
appointmentID = stringHash(appointmentID);
console.log(appointmentID);
patientList.set(appointmentID, patient3);

// DoctorID map to specific date and get the array of the patient at that date.
var doctorToCalendar = new Map();
doctorToCalendar = updateCalendar(doctorToCalendar, patient1);
doctorToCalendar = updateCalendar(doctorToCalendar, patient2);
doctorToCalendar = updateCalendar(doctorToCalendar, patient3);

// DoctorID map to specific date and time to get the number of reservation of specific time slot.
var doctorToCalendarTime = new Map();
doctorToCalendarTime = updateCalendarTime(doctorToCalendarTime, patient1);
doctorToCalendarTime = updateCalendarTime(doctorToCalendarTime, patient2);
doctorToCalendarTime = updateCalendarTime(doctorToCalendarTime, patient3);


app.get('/', (req, res) => {
    return res.send('Clinical Central Reservation System');
});

// HTTP Request - GET 
// Return the full doctorsList.
app.get('/getList/doctorsList', (req, res) => {
    var ret = "";
    for(var entry of doctorList.entries()){
        ret = ret + "doctorID: " + entry[0] + ", FirstName: " + doctorList.get(entry[0]).getFirstName() + ", LastName: " + doctorList.get(entry[0]).getLastName() + "<br>";
    }
    return res.send(ret);
});

// HTTP Request - GET
// Return the appointments list on specific date for specific doctor.
app.get('/getList/appointmentsList/?*', (req, res) => {
    var ret = "";
    var doctorID = parseInt(req.query['doctorID']);
    var dateKey = req.query['date'];
    ret = ret + "doctorID: " + doctorID + ", FirstName: " + doctorList.get(doctorID).getFirstName() + ", LastName: " + doctorList.get(doctorID).getLastName() + "<br>";
    if(doctorToCalendar.has(doctorID)){
        if(doctorToCalendar.get(doctorID).has(dateKey) && doctorToCalendar.get(doctorID).get(dateKey).length > 0){
            ret = ret + "#\tName\tTime\tKind<br>";
            for(var i=0; i<doctorToCalendar.get(doctorID).get(dateKey).length; ++i){
                ret = ret + (i+1).toString() + "\t" + doctorToCalendar.get(doctorID).get(dateKey)[i].getFirstName() + " " + doctorToCalendar.get(doctorID).get(dateKey)[i].getLastName() + "\t" + doctorToCalendar.get(doctorID).get(dateKey)[i].getTime() + "\t";
                if(doctorToCalendar.get(doctorID).get(dateKey)[i].getKind() == 0){
                    ret = ret + "New Patient<br>";
                }
                else{
                    ret = ret + "Follow-up<br>";
                }
            }
        }
        else{
            ret = ret + "There is no corresponding appointment for this doctor ID under of this date.<br>";
        }
    }
    else{
        ret = ret + "There is no corresponding doctor ID. <br>";
    }
    return res.send(ret);
});

// HTTP Request - GET
// Remove the specific appointment by appointmentID.
app.get('/deleteAppointment/?*', (req, res) => {
    var appointmentID = parseInt(req.query['appointmentID']);
    var ret = "";
    if(patientList.has(appointmentID)){
        var patient = patientList.get(appointmentID);
        var index = doctorToCalendar.get(parseInt(patient.getDoctorID())).get(patient.getDate()).indexOf(patient);
        doctorToCalendar.get(parseInt(patient.getDoctorID())).get(patient.getDate()).splice(index, 1);
        var val = doctorToCalendarTime.get(parseInt(patient.getDoctorID())).get(patient.getDate()).get(patient.getTime()) - 1;
        doctorToCalendarTime.get(parseInt(patient.getDoctorID())).get(patient.getDate()).set(patient.getTime(), val);
        patientList.delete(appointmentID);
        ret = ret + "Successfully delete the appointment ID for the reservation list<br>";
    }
    else{
        ret = ret + "There is no corresponding appointment ID for the reservation.<br>";
    }
    return res.send(ret);
});

// HTTP Request - GET
// Reserve the specific time and date for specific doctor and return the appointmentID.
app.get('/reserveAppointment/?*', (req, res) => {
    var firstName = req.query['firstName'];
    var lastName = req.query['lastName'];
    var date = req.query['date'];
    var time = req.query['time'];
    var kind = req.query['kind'];
    var doctorID = parseInt(req.query['doctorID']);
    var ret = "";
    var flag = true;

    ret = ret + "FirstName: " + firstName + ", LastName: " + lastName + ", date: " + date + ", time: " + time + ", kind: " + kind + ", doctorID: " + doctorID + "<br>";

    if(date.length != 8){
        ret = ret + "You should follow the correct date format such as 20200112 means 2020 Jan 12th.<br>";
        flag = false;
    }
    if(time.length != 4){
        ret = ret + "You should follow the correct time format such as 1600 means 16:00<br>";
        flag = false;
    }
    else{
        var hour = time[0] + time[1];
        if(parseInt(hour) > 23 || parseInt(hour) < 0){
            ret = ret + "You should follow the correct time format such as 1600 means 16:00<br>";
            flag = false;
        }
        var min = time[2] + time[3];
        if(parseInt(min) > 60 || parseInt(min) < 0){
            ret = ret + "You should follow the correct time format such as 1600 means 16:00<br>";
            flag = false;
        }
        if(parseInt(min) != 15 || parseInt(min) != 30 || parseInt(min) != 45 || parseInt(min) != 00){
            ret = ret + "You should book the time slot with the min in 00, 15, 30, or 45.<br>";
            flag = false;
        } 
    }
    if(kind!= 0 && kind != 1){
        ret = ret + "Kind should be 0(New Patient) or 1(Follow-up)";
        flag = false;
    }
    if(firstName.length == 0 || lastName.length == 0){
        ret = ret + "You should fill up the first name and last name at the same time";
        flag = false;
    }
    if(!doctorList.has(doctorID)){
        ret = ret + "There is no corresponding doctor ID for reservation.<br>";
        flag = false;
    }
    if(flag){
        if(doctorToCalendarTime.get(doctorID).has(date)){
            if(doctorToCalendarTime.get(doctorID).get(date).has(time)){
                if(doctorToCalendarTime.get(doctorID).get(date).get(time) >= 3){
                    ret = ret + "You should not book this time slot for this doctor because it already hits the maximum resversation number for this time slot.<br>";
                    flag = false;
                }
            }   
        }
    }

    if(flag){
        var patient = new Appointment(firstName, lastName, date, time, kind, req.query['doctorID']);
        appointmentID = patient.getFirstName() + patient.getLastName() + patient.getDate() + patient.getTime();
        appointmentID = stringHash(appointmentID);
        patientList.set(appointmentID, patient);
        doctorToCalendar = updateCalendar(doctorToCalendar, patient);
        doctorToCalendarTime = updateCalendarTime(doctorToCalendarTime, patient1);

        ret = ret + "Successfully book this time slot and the appointmentID is " + appointmentID + ".<br>";
    }
    else{
        ret = ret + "Fail to book this time slot. <br>";
    }

    return res.send(ret);
});

const server = http.createServer(app);
server.listen(port, () => console.log('Running... on port 3000'));
