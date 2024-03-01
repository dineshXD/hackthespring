import { useState } from "react";
import "./patient_form.css";
export const PersonalDetailsForm = ({
  email,
  contactNumber,
  fullName,
  age,
  gender,
  setEmail,
  setContactNumber,
  setFullName,
  setAge,
  setGender,
}) => {
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleContactNumber = (event) => {
    setContactNumber(event.target.value);
  };
  const handleFullName = (event) => {
    setFullName(event.target.value);
  };
  const handleAge = (event) => {
    setAge(event.target.value);
  };
  const handleGender = (gender) => {
    setGender(gender);
  };
  return (
    <div className="patientdata-form">
      <div className="patientdata-heading">
        <h1>Patient Health Journey</h1>
        <h3>Step 1 - Personal Information</h3>
      </div>
      <div className="patientdata-details">
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="patient-email">Patient Email</label>
            <input
              type="email"
              id="patient-email"
              className="form-input"
              placeholder="abc@gmail.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="patient-contact">Contact Number</label>
            <input
              type="number"
              id="patient-contact"
              className="form-input"
              placeholder="9000000000"
              value={contactNumber}
              onChange={handleContactNumber}
              required
            />
          </div>
        </div>
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="patient-fullname">Full Name</label>
            <input
              type="text"
              id="patient-fullname"
              className="form-input"
              placeholder="Dhobhi shah"
              value={fullName}
              onChange={handleFullName}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="patient-age">Age</label>
            <input
              type="number"
              id="patient-age"
              className="form-input"
              placeholder="23"
              value={age}
              min={1}
              max={100}
              onChange={handleAge}
              required
            />
          </div>
        </div>
        <div className="form-field">
          <div className="gender-selection">
            <label htmlFor="patient-gender">Gender</label>
            <input
              type="radio"
              id="male"
              value={"male"}
              checked={gender === "male"}
              onChange={(e) => handleGender("male")}
              required
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              value={"female"}
              checked={gender === "female"}
              onChange={(e) => handleGender("female")}
              required
            />
            <label htmlFor="male">Female</label>

            <input
              type="radio"
              id="notspecified"
              value={"notspecified"}
              checked={gender === "notspecified"}
              onChange={(e) => handleGender("notspecified")}
              required
            />
            <label htmlFor="male">Not Specified</label>
          </div>
        </div>
      </div>
    </div>
  );
};
