import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoctorImage from "../assets/doctor.png";
import { useParams } from "react-router-dom";
import { getDoctorByID } from "../state/doctorSlice";
import "./doctorMoreInfo.css";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Nav } from "../Nav";
export const DoctorMoreInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const doctorByID = useSelector((state) => state.doctor?.doctorById);
  const [isLoadingDoctor, setIsLoadingDoctor] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      setIsLoadingDoctor(true);
      try {
        await dispatch(getDoctorByID({ id }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingDoctor(false);
      }
    };
    fetchDoctor();
  }, [dispatch, id]);
  if (isLoadingDoctor && doctorByID?.status != "success") {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Nav />
      <div className="doctor-profile">
        <div className="doctor-image">
          <img src={DoctorImage} alt="doctor image" />
        </div>
        <div className="doctor-details">
          <h2>{doctorByID?.doctor?.fullName || "doctor name"}</h2>
          <br />
          <div className="detail">
            <span>{doctorByID?.doctor?.specializations || ""}</span>
          </div>
          <div className="detail">
            <span>Years of Experience:</span>
            <span>
              &nbsp;{doctorByID?.doctorProfile?.yearsOfExperience || 5}
            </span>
          </div>
          <div className="detail">
            <span>{doctorByID?.doctorProfile?.bio}</span>
          </div>
          <div className="detail">
            <span>
              <FaMapMarkerAlt />
              &nbsp;{doctorByID?.doctorProfile?.location}
            </span>
          </div>
          <div className="detail">
            <span>
              {" "}
              <FaEnvelope />
              &nbsp; {doctorByID?.doctor?.email}
            </span>
          </div>
          {/* <div className="detail">
            <span>
              <FaPhone /> &nbsp;+91 1223343343
            </span>
          </div> */}
          <div>
            <h1>Available on : </h1>
          </div>
          <div className="availability-detail">
            {doctorByID?.doctorProfile?.availability &&
            doctorByID?.doctorProfile?.availability.length > 0 ? (
              doctorByID?.doctorProfile?.availability.map((ava) => {
                return (
                  <>
                    <br />
                    <div className="available-box">
                      <span>
                        <AccessTimeIcon />
                        {ava.date && new Date(ava.date).toLocaleDateString()}
                      </span>
                      <br />
                      <span>
                        <DateRangeIcon />
                        {ava.startTime} - {ava.endTime}
                      </span>
                    </div>
                  </>
                );
              })
            ) : (
              <>
                <br />
                <div className="available-box">
                  <span>
                    <AccessTimeIcon />
                    02/03/24 - 09/04/24
                  </span>
                  <br />
                  <span>
                    <DateRangeIcon /> 1:30pm - 5:30pm
                  </span>
                </div>
              </>
            )}
            {/* <div className="available-box">
              <span>02/03/24 - 09/04/24</span>
              <br />
              <span>1:30pm - 5:30pm</span>
            </div>{" "} */}
            {/* <div className="available-box">
              <span>02/03/24 - 09/04/24</span>
              <br />
              <span>1:30pm - 5:30pm</span>
            </div> */}
            {/* <div className="available-box">
              <span>
                <AccessTimeIcon />
                02/03/24 - 09/04/24
              </span>
              <br />
              <span>
                <DateRangeIcon /> 1:30pm - 5:30pm
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
