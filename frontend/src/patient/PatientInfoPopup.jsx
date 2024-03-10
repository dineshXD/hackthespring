import React, { useEffect, useState } from "react";
import "./PatientInfoPopup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../state/orderSlice";
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

function PatientInfoPopup({ isOpen, closePopup, patientInfo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const handleApprove = async (orderId) => {
    const status = "approved";
    try {
      await dispatch(updateOrderStatus({ orderId, status }));
      setIsApproved(true);
    } catch (error) {
      console.log(error);
      setIsApproved(false);
    } finally {
      closePopup();
    }
  };
  const handleReject = async (orderId) => {
    const status = "rejected";
    try {
      await dispatch(updateOrderStatus({ orderId, status }));
      setIsRejected(true);
    } catch (error) {
      console.log(error);
      setIsRejected(false);
    } finally {
      closePopup();
    }
  };

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
          {patientInfo.status === "pending" && !isApproved && !isRejected && (
            <div className="doctor-btn">
              <button onClick={() => handleApprove(patientInfo._id)}>
                Approve
              </button>
              <button onClick={() => handleReject(patientInfo._id)}>
                Reject
              </button>
            </div>
          )}
          {(patientInfo.status === "approved" || isApproved) && (
            <div className="doctor-btn">
              <button
                style={{
                  cursor: "default",
                }}
                disabled={true}
              >
                Approved
              </button>
            </div>
          )}
          {(patientInfo.status === "rejected" || isRejected) && (
            <div className="doctor-btn">
              <button
                style={{
                  cursor: "default",
                }}
                disabled={true}
              >
                Rejected
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PatientInfoPopup;
