import {useState} from "react";
import axios from "axios";

const AddAttendance = () => {
  const userId = localStorage.getItem("userId");
    const [checkInTime, setCheckInTime] = useState("");
    const [checkOutTime, setCheckOutTime] = useState("");
  
    const handleCheckIn = async () => {
      try {
        const data = {
          checkIn: checkInTime,
          hasCheckIn: true,
          user: {
            userId: userId
          }
        };
  
        const response = await axios.post(
          `http://localhost:8080/api/attendance/checkin/${userId}`,
          data
        );
  
        console.log("Check-in successful:", response.data);
      } catch (error) {
        console.log("Check-in error:", error);
      }
    };
  
    const handleCheckOut = async () => {
      try {
        const data = {
          checkOut: checkOutTime,
          hasCheckOut: true,
          user: {
            userId: userId
          }
        };
  
        const response = await axios.post(
          `http://localhost:8080/api/attendance/checkout/${userId}`,
          data
        );
  
        console.log("Check-out successful:", response.data);
      } catch (error) {
        console.log("Check-out error:", error);
      }
    };
  
    return (
      <div>
        <h2>Add Attendance</h2>
        <div>
          <label>Check-in Time:</label>
          <input
            type="datetime-local"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
          />
          <button onClick={handleCheckIn}>Check In</button>
        </div>
        <div>
          <label>Check-out Time:</label>
          <input
            type="datetime-local"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
          />
          <button onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    );
  };
  
  export default AddAttendance;
  