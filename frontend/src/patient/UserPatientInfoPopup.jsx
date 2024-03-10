import React, { useState } from "react";
import "./PatientInfoPopup.css";

// const PatientInfo = {
//   email: "dinesh@gmail.com",
//   fullName: "Name Last",
//   age: 23,
//   gender: "male",
//   contactNumber: 9999999999,
//   medicalHistory: "hypertension",
//   currentSymptoms: "Severe headache, blurry vision, nause",
//   ongoingMedicine: "metformin for diabetes",
//   vitalSigns: "Elevated blood pressure",
// };

function UserPatientInfoPopup({ isOpen, closePopup, patientInfo }) {
  return (
    <>
      {/* <button onClick={openPopup}>More Info</button> */}
      {isOpen && (
        <div className={`patient-info-popup `}>
          <div className="close-btn">
            <button onClick={closePopup}>Close</button>
          </div>
          <div className="popup-header">
            <h3>Patient Details</h3>
          </div>
          <div className="popup-content">
            <ul>
              <li>Email: {patientInfo.email}</li>
              <li>Full Name: {patientInfo.fullName}</li>
              <li>Age: {patientInfo.age}</li>
              <li>Gender: {patientInfo.gender}</li>
              <li>Contact Number: {patientInfo.contactNumber}</li>
              <li>Medical History: {patientInfo.medicalHistory}</li>
              <li>Current Symptoms: {patientInfo.currentSymptoms}</li>
              <li>Ongoing Medicine: {patientInfo.ongoingMedicine}</li>
              <li>Vital Signs: {patientInfo.vitalSigns}</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default UserPatientInfoPopup;
