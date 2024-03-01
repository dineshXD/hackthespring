import { useMemo, useState } from "react";
import "./patient_form.css";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { MedicalDetailsForm } from "./MedicalDetails";
import { Nav } from "../Nav";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { SelectDoctor } from "./SelectDoctor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookConsultation } from "../state/orderSlice";
export const PatientForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctorID, setSelectedDoctorID] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [currentSymptoms, setCurrentSymptoms] = useState("");
  const [ongoingMedicine, setOngoingMedicine] = useState("");
  const [vitalSigns, setVitalSigns] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order?.orderBooked);
  const steps = useMemo(
    () => [
      <SelectDoctor setSelectedDoctorID={setSelectedDoctorID} />,
      <PersonalDetailsForm
        email={email}
        setEmail={setEmail}
        contactNumber={contactNumber}
        setContactNumber={setContactNumber}
        fullName={fullName}
        setFullName={setFullName}
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
      />,
      <MedicalDetailsForm
        medicalHistory={medicalHistory}
        currentSymptoms={currentSymptoms}
        ongoingMedicine={ongoingMedicine}
        vitalSigns={vitalSigns}
        setCurrentSymptoms={setCurrentSymptoms}
        setMedicalHistory={setMedicalHistory}
        setOngoingMedicine={setOngoingMedicine}
        setVitalSigns={setVitalSigns}
      />,
    ],
    [
      email,
      age,
      fullName,
      contactNumber,
      gender,
      medicalHistory,
      currentSymptoms,
      ongoingMedicine,
      vitalSigns,
    ]
  );
  const handleNext = () => setCurrentStep(currentStep + 1);

  const handleBack = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      selectedDoctorID,
      email,
      fullName,
      age,
      gender,
      contactNumber,
      medicalHistory,
      currentSymptoms,
      ongoingMedicine,
      vitalSigns,
    });
    try {
      await dispatch(
        bookConsultation({
          selectedDoctorID,
          email,
          fullName,
          age,
          gender,
          contactNumber,
          medicalHistory,
          currentSymptoms,
          ongoingMedicine,
          vitalSigns,
        })
      );
      console.log(order);
      if (order?.status === "success") {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="patientdata-form"
      >
        {steps[currentStep - 1]}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {currentStep !== steps.length && (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          )}
          {currentStep > 1 && (
            <button type="button" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep === steps.length && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </form>
    </>
  );
};
