import "./homepage.css";
import DoctorImage from "../assets/doctor.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllDoctors } from "../state/doctorSlice";
export const HomePage = () => {
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
  return (
    <>
      <header>
        <div className="heading">
          <h1>Choose Your doctors on MediConnect</h1>
          <p>Access,Verify, and analyze Your health Data with GPT.</p>
        </div>
      </header>
      <main>
        <section style={{ marginTop: "10px" }}>
          <h1 style={{ textAlign: "center", fontSize: "30px" }}>Features</h1>
          <div className="feature-cards">
            <div className="feature-card">
              <h1>Preferred Doctors</h1>
              <p>Doctor Selection</p>
            </div>
            <div className="feature-card">
              <h1>Psychritic Treatment With GPT</h1>
              <p>GPT IS HERE FOR YOU</p>
            </div>
            <div className="feature-card">
              <h1>GPT analysis</h1>
              <p>Treatment plans</p>
            </div>
          </div>
        </section>
        <section style={{ margin: "30px 0" }}>
          <h1 style={{ textAlign: "center", fontSize: "30px" }}>
            Top Rated Doctors on
          </h1>
          <div className="doctor-cards">
            {doctors.map((doctor) => (
              <div className="doctor-card">
                <img src={DoctorImage} alt="doctor image" />
                <h1>{doctor.fullName || "Hello World"}</h1>
                <p>{doctor.specializations || "SeD"}</p>
                <button>More Info</button>
              </div>
            ))}

            {/* <div className="doctor-card">
              <img src={DoctorImage} alt="doctor image" />
              <h1>Dr. Wellness Clicnic</h1>
              <p>HealthCare club</p>
              <button>More Info</button>
            </div>
            <div className="doctor-card">
              <img src={DoctorImage} alt="doctor image" />
              <h1>Dr. Wellness Clicnic</h1>
              <p>HealthCare club</p>
              <button>More Info</button>
            </div>
            <div className="doctor-card">
              <img src={DoctorImage} alt="doctor image" />
              <h1>Dr. Wellness Clicnic</h1>
              <p>HealthCare club</p>
              <button>More Info</button>
            </div>
            <div className="doctor-card">
              <img src={DoctorImage} alt="doctor image" />
              <h1>Dr. Wellness Clicnic</h1>
              <p>HealthCare club</p>
              <button>More Info</button> 
            </div> */}
          </div>
        </section>
        <div className="line" />
      </main>
      <footer>
        <div className="footer-heading">
          <div>
            <h1>MediConnect - AI Powered</h1>
            <p>Bringing Innvoation to medical science</p>
          </div>
          <a href="mailto:support@mediconnect.com">support@mediconnect.com</a>
        </div>
        <div className="footer-menu">
          <ul>
            <li>support</li>
            <li>Faqs</li>
            <li>User Manual</li>
            <li>Contact support</li>
          </ul>
        </div>
      </footer>
    </>
  );
};
