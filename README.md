# Clinical-Reservation-System

How to Active the Clinical Reservation System:<br />
1. cd to the Clinical-Reservation-System folder.<br />
2. node index.js (It should run locally on your device)<br />
<br />
How to Verify the Clinical Reseravation System is active:<br />
1. Open the browser and type the url as "http://localhost:3000/"<br />
   And you should see the "Clinical Central Reservation System" from the browser.<br />
<br />
How to Verfiy the Function to Get Full Doctor Lists:<br />
1. http://localhost:3000/getList/doctorsList<br />
   It should trigger the GET operation of RESTFUL to the backend service and show the below results.<br />
   doctorID: 3905040912, FirstName: LIHSING, LastName: LIN<br />
   doctorID: 2783010089, FirstName: LEN, LastName: LIN<br />
<br />
How to Verify the Function to Get Appointment List of Specific Doctor on Specific Date:<br />
For example, query the backend service with the unique doctorID and specific date as the format like 20200112 means 2020 Jan 12.<br />
1. http://localhost:3000/getList/appointmentsList/?doctorID=3905040912&date=20200112 <br />
   It should trigger the GET operation of RESTFUL to the backend service and show the below results.<br />
    doctorID: 3905040912, FirstName: LIHSING, LastName: LIN<br />
      Name Time Kind<br />
    1 Tommy Wang 1500 New Patient<br />
    2 David Chen 1500 Follow-up<br />
<br />
How to Verify the Funciton to Deleting Existing Appointment From a Doctor Appointments:<br />
For example, check the below appointlist of specific doctor on specific dae.<br />
1. http://localhost:3000/getList/appointmentsList/?doctorID=3905040912&date=20200112 <br />
   It should trigger the GET operation of RESTFUL to the backend service and show the below results.<br />
    doctorID: 3905040912, FirstName: LIHSING, LastName: LIN<br />
      Name Time Kind<br />
    1 Tommy Wang 1500 New Patient<br />
    2 David Chen 1500 Follow-up<br />
<br />
Delete the appointment by unique appointmentID.<br />
2. http://localhost:3000/deleteAppointment/?appointmentID=2138471166<br />
    Successfully delete the appointment ID for the reservation list<br />
<br />
3. http://localhost:3000/getList/appointmentsList/?doctorID=3905040912&date=20200112<br />
    doctorID: 3905040912, FirstName: LIHSING, LastName: LIN<br />
      Name Time Kind<br />
    1 David Chen 1500 Follow-up<br />
<br />
How to Verify the Reserver Appointment:<br />
1. http://localhost:3000/getList/appointmentsList/?doctorID=3905040912&date=20200112<br />
    doctorID: 3905040912, FirstName: LIHSING, LastName: LIN<br />
      Name Time Kind<br />
    1 David Chen 1500 Follow-up<br />
<br />
Reserve the slot with below link.<br />
2. http://localhost:3000/reserveAppointment/?firstName=Jeremy&lastName=Lin&date=20200112&time=1530&kind=0&doctorID=3905040912<br />
    FirstName: Jeremy, LastName: Lin, date: 20200112, time: 1530, kind: 0, doctorID: 3905040912<br />
    Successfully book this time slot and the appointmentID is 779809895.<br />
<br />
3. http://localhost:3000/getList/appointmentsList/?doctorID=3905040912&date=20200112<br />
    doctorID: 3905040912, FirstName: LIHSING, LastName: LIN<br />
      Name Time Kind<br />
    1 David Chen 1500 Follow-up<br />
    2 Jeremy Lin 1530 New Patient<br />
