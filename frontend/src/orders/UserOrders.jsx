import { useNavigate } from "react-router-dom";
import { Nav } from "../Nav";
import "./orders.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  generateGPTResponse,
  getDoctorOrders,
  getUserOrders,
} from "../state/orderSlice";
import PatientInfoPopup from "../patient/PatientInfoPopup";
import UserPatientInfoPopup from "../patient/UserPatientInfoPopup";
export const UserOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.order?.userOrders);
  console.log(userOrders);
  const [userOrdersLoading, setUserOrdersLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const closePopup = () => {
    setIsOpen(false);
  };

  const handleMoreInfo = (orderId) => {
    setIsOpen(true);
    setSelectedOrderId(orderId);
  };
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setUserOrdersLoading(true);
        await dispatch(getUserOrders());
      } catch (error) {
        setUserOrdersLoading(false);
        setIsError(true);
        console.log(error);
      } finally {
        setUserOrdersLoading(false);
      }
    };
    fetchUserOrders();
  }, [dispatch]);

  return (
    <>
      <Nav />
      <div className="orders">
        <div className={`order ${isOpen ? "popup-open" : ""}`}>
          <div className="order-heading">
            <h1>Orders</h1>
          </div>
          <div className="order-data">
            {userOrdersLoading ? (
              <h1 style={{ textAlign: "center" }}>Loading...</h1>
            ) : isError ? (
              <h1 style={{ textAlign: "center" }}>No orders found.</h1>
            ) : userOrders != null ? (
              userOrders.map((userOrder) => {
                return (
                  <>
                    <div className="order-list">
                      <div className="patient-name">
                        <h3>{userOrder.fullName}</h3>
                      </div>
                      <div className="patient-contact">
                        <p>{userOrder.contactNumber}</p>
                        <p>{new Date(userOrder.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="order-button">
                        <button
                          style={
                            userOrder.status === "rejected" ||
                            userOrder.status === "pending"
                              ? { backgroundColor: "red" }
                              : { backgroundColor: "green" }
                          }
                        >
                          {userOrder.status}
                        </button>
                        {/* <button
                          onClick={() => navigate(`chat/${selectedDoctorId}`)}
                        >
                          Message
                        </button> */}
                        <button onClick={() => handleMoreInfo(userOrder._id)}>
                          More Info
                        </button>
                      </div>
                    </div>

                    {/* <p>
                      {gptResponseLoading &&
                      doctor._id == gptResponseAI?.output?.orderId
                        ? "Loading..."
                        : gptText || ""}
                    </p> */}
                  </>
                );
              })
            ) : (
              <h1 style={{ textAlign: "center", margin: "20px 0" }}>
                No Order found
              </h1>
            )}
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
        {selectedOrderId && (
          <UserPatientInfoPopup
            isOpen={isOpen}
            closePopup={closePopup}
            patientInfo={userOrders.find(
              (order) => order._id === selectedOrderId
            )}
          />
        )}
      </div>
    </>
  );
};
