import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./createprofile.css";
import { useDispatch, useSelector } from "react-redux";
import { createDoctorProfile } from "../state/doctorSlice";
export const CreateProfile = () => {
  const [specializations, setSpecializations] = useState("");
  const [location, setLocation] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [education, setEducation] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.doctor.error);
  const profile = useSelector((state) => state.doctor?.profile);
  const submitProfile = async (e) => {
    e.preventDefault();
    // I am a passionate cardiologist dedicated to providing excellent patient care and promoting heart health.
    try {
      await dispatch(
        createDoctorProfile({
          specializations,
          location,
          yearsOfExperience,
          education,
          bio,
        })
      );
      if (profile?.status === "success") {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // If user is logged in, navigate to homepage
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);
  return (
    <>
      <div className="createprofile-form">
        <div className="profile-form">
          <div className="profile-heading">
            <h1>Welcome to Medtech!</h1>
            <p>Create Profile to continue.</p>
          </div>
          <form className="form-fields" onSubmit={submitProfile}>
            <div className="form-field">
              <label htmlFor="specialization">
                In which field you are specialized?
              </label>
              <input
                type="text"
                id="specialization"
                className="form-input"
                placeholder="e.g. Cardiology"
                value={specializations}
                onChange={(e) => setSpecializations(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                className="form-input"
                placeholder="enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="experience">Year of experience</label>
              <input
                type="number"
                id="experience"
                className="form-input"
                placeholder="total years of experience e.g. 10"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="education">Education</label>
              <input
                type="text"
                id="education"
                className="form-input"
                placeholder="enter your education details"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="bio">Bio</label>
              <textarea
                placeholder="write about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <button>Create Profile</button>
            {error && <p style={{ textAlign: "center" }}>{error.message}</p>}
          </form>
        </div>
      </div>
    </>
  );
};
