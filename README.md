# Clinical-Reservation-System

How to Active the Clinical Reservation System:
1. cd to the Clinical-Reservation-System folder.
2. node index.js (It should run locally on your device)

How to Verify the Clinical Reseravation System is active:
1. Open the browser and type the url as "http://localhost:3000/"
   And you should see the "Clinical Central Reservation System" from the browser.

How to Verfiy the Function to Get Full Doctor Lists:
1. http://localhost:3000/getList/doctorsList
   It should trigger the GET operation of RESTFUL to the backend service and show the below results.
   doctorID: 3905040912, FirstName: LIHSING, LastName: LIN
   doctorID: 2783010089, FirstName: LEN, LastName: LIN

How to Verify the Function to Get Appointment List of Specific Doctor on Specific Date:
For example, query the backend service with the unique doctorID and specific date as the format like 20200112 means 2020 Jan 12.
1. http://localhost:3000/getList/appointmentsList/?doctorID=3905040912&date=20200112 
   It should trigger the GET operation of RESTFUL to the backend service and show the below results.
    doctorID: 3905040912, FirstName: LIHSING, LastName: LIN
      Name Time Kind
    1 Tommy Wang 1500 New Patient
    2 David Chen 1500 Follow-up

How to Verify the Funciton to Deleting Existing Appointment From a Doctor Appointments:
For example, check the below appointlist of specific doctor on specific dae.
1. http://localhost:3000/getList/appointmentsList/?doctorID=3905040912&date=20200112 
   It should trigger the GET operation of RESTFUL to the backend service and show the below results.
    doctorID: 3905040912, FirstName: LIHSING, LastName: LIN
      Name Time Kind
    1 Tommy Wang 1500 New Patient
    2 David Chen 1500 Follow-up

Delete the appointment by unique appointmentID.
2. http://localhost:3000/deleteAppointment/?appointmentID=2138471166
    Successfully delete the appointment ID for the reservation list

3. http://localhost:3000/getList/appointmentsList/?doctorID=3905040912&date=20200112
    doctorID: 3905040912, FirstName: LIHSING, LastName: LIN
      Name Time Kind
    1 David Chen 1500 Follow-up

How to Verify the Reserver Appointment:
1. http://localhost:3000/getList/appointmentsList/?doctorID=3905040912&date=20200112
    doctorID: 3905040912, FirstName: LIHSING, LastName: LIN
      Name Time Kind
    1 David Chen 1500 Follow-up

Reserve the slot with below link.
2. http://localhost:3000/reserveAppointment/?firstName=Jeremy&lastName=Lin&date=20200112&time=1530&kind=0&doctorID=3905040912
    FirstName: Jeremy, LastName: Lin, date: 20200112, time: 1530, kind: 0, doctorID: 3905040912
    Successfully book this time slot and the appointmentID is 779809895.

3. http://localhost:3000/getList/appointmentsList/?doctorID=3905040912&date=20200112
    doctorID: 3905040912, FirstName: LIHSING, LastName: LIN
      Name Time Kind
    1 David Chen 1500 Follow-up
    2 Jeremy Lin 1530 New Patient
