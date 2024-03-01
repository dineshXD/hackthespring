import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDoctors } from "../state/doctorSlice";
import DoctorImage from "../assets/doctor.png";
export const SelectDoctor = ({ setSelectedDoctorID }) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const doctorSpecializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    // Add more specializations as needed
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctors);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        await dispatch(getAllDoctors());
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, [dispatch]);
  const handleDoctorID = (id) => {
    setSelectedDoctorID(id);
  };
  return (
    <div className="patientdata-form">
      <div className="patientdata-heading">
        <h1>Patient Health Journey</h1>
        <h3>Step 1 - Select Doctor</h3>
      </div>
      <div className="patientdata-details">
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="doctor-list">Select Doctor Specialization</label>
            <select
              id="select_doctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Select Doctor Specialization</option>
              {doctorSpecializations.map((field, index) => {
                return (
                  <option value={field} key={index}>
                    {field}
                  </option>
                );
              })}
            </select>

            {/* {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <div className="doctor-card">
                    <img src={DoctorImage} alt="doctor image" />
                    <h1>{doctor.fullName || "Hello World"}</h1>
                    <p>{doctor.specializations || "SeD"}</p>
                    <button>More Info</button>
                  </div>
                ))
              ) : (
                <h1>No Doctors Found</h1>
              )} */}
            {selectedDoctor && (
              <>
                {doctors.length > 0 &&
                doctors.filter((doctor) =>
                  doctor.specializations.includes(selectedDoctor)
                ).length > 0 ? (
                  <div className="doctor-cards">
                    {doctors
                      .filter((doctor) =>
                        doctor.specializations.includes(selectedDoctor)
                      )
                      .map((doctor) => (
                        <div className="doctor-card" key={doctor._id}>
                          <img src={DoctorImage} alt="doctor image" />
                          <h1>{doctor.fullName || "Hello World"}</h1>
                          <p>{doctor.specializations || "SeD"}</p>
                          <button>More Info</button>
                          <button onClick={() => handleDoctorID(doctor._id)}>
                            Select Doctor
                          </button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <h1>No Doctors Found</h1>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="doctor-cards">
                  {doctors.map((doctor) => (
                    <div key={doctor._id} className="doctor-card">
                      <img src={DoctorImage} alt="doctor image" />
                      <h1>{doctor.fullName || "Hello World"}</h1>
                      <p>{doctor.specializations}</p>
                      <button>More Info</button>
                    </div>
                  ))}
                </div> */
}
