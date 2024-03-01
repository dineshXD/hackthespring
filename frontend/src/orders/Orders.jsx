import { useNavigate } from "react-router-dom";
import { Nav } from "../Nav";
import "./orders.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { generateGPTResponse, getDoctorOrders } from "../state/orderSlice";
export const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doctorOrders = useSelector((state) => state.order?.doctorOrders);
  const gptResponse = useSelector((state) => state.order?.gptResponse);
  console.log(gptResponse);
  useEffect(() => {
    const fetchDoctorOrders = async () => {
      try {
        await dispatch(getDoctorOrders());
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctorOrders();
  }, [dispatch]);
  const handleGPTResponse = async ({
    fullName,
    medicalHistory,
    currentSymptoms,
    ongoingMedicine,
    vitalSigns,
  }) => {
    try {
      await dispatch(
        generateGPTResponse({
          fullName,
          medicalHistory,
          currentSymptoms,
          ongoingMedicine,
          vitalSigns,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      <div className="orders">
        <div className="order">
          <div className="order-heading">
            <h1>Orders</h1>
          </div>
          <div className="order-data">
            <div className="order-list">
              {doctorOrders.map((doctor) => {
                return (
                  <>
                    <div className="patient-name">
                      <h3>{doctor.fullName}</h3>
                    </div>
                    <div className="patient-contact">
                      <p>{doctor.contactNumber}</p>
                      <p>{new Date(doctor.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="order-button">
                      <button>Message</button>
                      <button onClick={() => handleGPTResponse(doctor)}>
                        Generate GPT Analysis
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
            <p>{gptResponse.output.candidates[0].content.parts[0].text}</p>
          </div>
          <div className="order-list">
            <div className="patient-name">
              <h3>Patient Name</h3>
            </div>
            <div className="patient-contact">
              <p>9000000000</p>
              <p>November 11,2020 at 9:30 AM</p>
            </div>
            <div className="order-button">
              <button>Message</button>
              <button>Generate GPT Analysis</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
