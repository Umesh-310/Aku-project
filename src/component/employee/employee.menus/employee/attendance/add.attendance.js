import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import style from "./attendance.module.css";

const AddAttendance = () => {
  const userId = localStorage.getItem("userId");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handleCheckIn = async () => {
    try {
      const data = {
        checkIn: new Date(),
        hasCheckIn: true,
        user: {
          userId: userId,
        },
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
        checkOut: new Date(),
        hasCheckOut: true,
        user: {
          userId: userId,
        },
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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedDateTime = () => {
    const day = String(currentDateTime.getDate()).padStart(2, "0");
    const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
    const year = currentDateTime.getFullYear();
    const hours = String(currentDateTime.getHours()).padStart(2, "0");
    const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div>
      <h2 className={style.time}>Add Attendance</h2>
      <h2 className={style.time}>{formattedDateTime()}</h2>
      <div className={style.div}>
        <button onClick={handleCheckIn} className={style.button}>
          checkIn
        </button>
        <button onClick={handleCheckOut} className={style.button}>
          checkout
        </button>
      </div>
    </div>
  );
};

export default AddAttendance;
