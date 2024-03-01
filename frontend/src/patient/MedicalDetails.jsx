import { useState } from "react";
import "./patient_form.css";
export const MedicalDetailsForm = ({
  medicalHistory,
  currentSymptoms,
  ongoingMedicine,
  vitalSigns,
  setCurrentSymptoms,
  setMedicalHistory,
  setVitalSigns,
  setOngoingMedicine,
}) => {
  const handleMedicalHistoryChange = (event) => {
    console.log(event.target.value);
    setMedicalHistory(event.target.value);
  };
  const handleCurrentSymptoms = (event) => {
    setCurrentSymptoms(event.target.value);
  };
  const handleVitalSigns = (event) => {
    setVitalSigns(event.target.value);
  };
  const handleOngoingMedicine = (event) => {
    setOngoingMedicine(event.target.value);
  };
  return (
    <div className="patientdata-form">
      <div className="patientdata-heading">
        <h1>Patient Health Journey</h1>
        <h3>Step 2 - Medical Information</h3>
      </div>
      <div className="patientdata-details">
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="medical-history">Patient Medical History</label>
            <input
              type="text"
              id="medical-history"
              className="form-input"
              placeholder="e.g. Hypertension"
              value={medicalHistory}
              onChange={handleMedicalHistoryChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="current-symptoms">Current Symptoms</label>
            <input
              type="text"
              id="current-symptoms"
              className="form-input"
              placeholder="e.g. Severe headache, blurry vision, nausea"
              value={currentSymptoms}
              onChange={handleCurrentSymptoms}
              required
            />
          </div>
        </div>
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="ongoing-medicine">
              Currently taking any medicine?
            </label>
            <input
              type="text"
              id="ongoing-medicine"
              className="form-input"
              placeholder="e.g. metformin for diabetes"
              value={ongoingMedicine}
              onChange={handleOngoingMedicine}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="vital-signs">Vital Signs</label>
            <input
              type="text"
              id="vital-signs"
              className="form-input"
              placeholder="e.g. pulse rate, body temperature."
              value={vitalSigns}
              onChange={handleVitalSigns}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
