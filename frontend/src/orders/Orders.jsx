import { useNavigate } from "react-router-dom";
import { Nav } from "../Nav";
import "./orders.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { generateGPTResponse, getDoctorOrders } from "../state/orderSlice";
import PatientInfoPopup from "../patient/PatientInfoPopup";
export const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doctorOrders = useSelector((state) => state.order?.doctorOrders);
  const gptResponseAI = useSelector((state) => state.order?.gptResponse);
  const [isFetchDoctorsLoading, setFetchDoctorLoading] = useState(false);
  const [gptResponseLoading, setGptResponseLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const closePopup = () => {
    setIsOpen(false);
  };

  const handleMoreInfo = (orderId) => {
    setIsOpen(true);
    setSelectedOrderId(orderId);
  };
  const handleFilterChange = (event) => {
    setSortOrder(event.target.value);
  };
  const sortedOrders = useMemo(() => {
    if (!doctorOrders) return []; // Handle case where doctorOrders is not yet available

    const sorted = [...doctorOrders].sort((a, b) => {
      const orderA = new Date(a.createdAt); // Assuming 'createdAt' field holds timestamps
      const orderB = new Date(b.createdAt);

      if (sortOrder === "ascending") {
        return orderA - orderB; // Sort from earlier to later
      } else {
        return orderB - orderA; // Sort from later to earlier
      }
    });

    return sorted;
  }, [doctorOrders, sortOrder]);
  useEffect(() => {
    const fetchDoctorOrders = async () => {
      try {
        setFetchDoctorLoading(true);
        await dispatch(getDoctorOrders());
      } catch (error) {
        console.log(error);
      } finally {
        setFetchDoctorLoading(false);
      }
    };
    fetchDoctorOrders();
  }, [dispatch]);
  const handleGPTResponse = async ({
    _id,
    fullName,
    medicalHistory,
    currentSymptoms,
    ongoingMedicine,
    vitalSigns,
  }) => {
    setGptResponseLoading(true);
    try {
      await dispatch(
        generateGPTResponse({
          orderId: _id,
          fullName,
          medicalHistory,
          currentSymptoms,
          ongoingMedicine,
          vitalSigns,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setGptResponseLoading(false);
    }
  };
  return (
    <>
      <Nav />
      <div className="orders">
        <div className={`order ${isOpen ? "popup-open" : ""}`}>
          <div className="order-heading">
            <h1>Orders</h1>
            <div className="order-filter">
              <select value={sortOrder} onChange={handleFilterChange}>
                <option value="ascending">Ascending</option>
                <option value="decending">Decending</option>
              </select>
            </div>
          </div>
          <div className="order-data">
            {isFetchDoctorsLoading ? (
              <h1 style={{ textAlign: "center" }}>Loading...</h1>
            ) : doctorOrders != null ? (
              sortedOrders.map((doctor) => {
                console.log(doctor._id == gptResponseAI?.output?.orderId);
                let gptText;

                if (gptResponseAI?.output?.gptResponse) {
                  const lines = gptResponseAI.output.gptResponse.split(/\\n/);

                  gptText = lines.join("\n");
                }

                return (
                  <>
                    <div className="order-list">
                      <div className="patient-name">
                        <h3>{doctor.fullName}</h3>
                      </div>
                      <div className="patient-contact">
                        <p>{doctor.contactNumber}</p>
                        <p>{new Date(doctor.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="order-button">
                        <button onClick={() => handleMoreInfo(doctor._id)}>
                          More Info
                        </button>
                        {/* <button
                          onClick={() =>
                            navigate(`/chat/${doctor.patientId}`, {
                              state: { doctor: doctor },
                            })
                          }
                        >
                          Message
                        </button> */}
                        <button onClick={() => handleGPTResponse(doctor)}>
                          Generate GPT Analysis
                        </button>
                      </div>
                    </div>
                    {doctor._id === gptResponseAI?.output?.orderId && (
                      <p>{gptResponseLoading ? "Loading..." : gptText || ""}</p>
                    )}
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

          {/* <div className="order-list">
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
          </div> */}
        </div>
        {selectedOrderId && (
          <PatientInfoPopup
            isOpen={isOpen}
            closePopup={closePopup}
            patientInfo={doctorOrders.find(
              (order) => order._id === selectedOrderId
            )}
          />
        )}
      </div>
    </>
  );
};
