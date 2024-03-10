import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAvailability } from "../state/doctorSlice";
import { Nav } from "../Nav";
import "./availability.css";
import { useNavigate } from "react-router-dom";
export const DoctorAvailabilityForm = ({ initialAvailability, onSubmit }) => {
  const [availability, setAvailability] = useState(initialAvailability || []);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddAvailability = () => {
    setAvailability([
      ...availability,
      { date: null, startTime: "", endTime: "" },
    ]);
  };

  const handleRemoveAvailability = (index) => {
    const newAvailability = [...availability];
    newAvailability.splice(index, 1);
    setAvailability(newAvailability);
  };

  const handleChange = (event, index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][event.target.name] = event.target.value;
    setAvailability(updatedAvailability);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredAvailability = availability.filter(
      (slot) =>
        slot.date !== null && slot.startTime !== "" && slot.endTime !== ""
    );
    // console.log(filteredAvailability);
    try {
      setIsLoading(true);
      await dispatch(addAvailability({ availability: filteredAvailability }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigate("/");
    }
    // onSubmit(availability); // Submit the updated availability array to the parent component
  };

  return (
    <>
      <Nav />
      <div className="availability-form">
        <div className="add-availabilty-form">
          <div className="auth-heading">
            <h1>Please Add your timings</h1>
          </div>
          <form onSubmit={handleSubmit} className="form-fields">
            {availability.map((slot, index) => (
              <div key={index}>
                <div className="form-field">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    className="form-input"
                    value={slot.date || ""}
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
                <div className="form-field">
                  <label>Start Time:</label>
                  <input
                    type="time"
                    name="startTime"
                    value={slot.startTime}
                    className="form-input"
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
                <div className="form-field">
                  <label>End Time:</label>
                  <input
                    type="time"
                    name="endTime"
                    value={slot.endTime}
                    className="form-input"
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
                <button
                  type="button"
                  style={{ margin: "20px 0" }}
                  onClick={() => handleRemoveAvailability(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAvailability}
              style={{ width: "100%" }}
            >
              Add New Availability
            </button>
            <button type="submit">
              {isLoading ? "Adding.." : "Save Availability"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
// const DoctorAvailability = ({ availability }) => {
//   return (
//     <ul>
//       {availability.map((slot) => (
//         <li key={slot.date?.getTime()}>
//           {" "}
//           {/* Use date object's timestamp for unique key */}
//           {slot.date && new Date(slot.date).toLocaleDateString()}{" "}
//           {/* Display formatted date if available */}
//           <br />
//           {slot.startTime} - {slot.endTime}
//         </li>
//       ))}
//     </ul>
//   );
// };
