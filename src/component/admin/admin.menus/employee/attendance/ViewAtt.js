import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const ViewAtt = ({ attendanceId }) => {
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/attendance/${attendanceId}`);
        if (response?.status === 200) {
          setAttendance(response.data);
        }
      } catch (error) {
        console.log(error);
        notifications.show({
          id: "error-message",
          withCloseButton: true,
          autoClose: 3000,
          message: "Failed to fetch attendance details",
          color: "red",
          loading: false
        });
      }
    };

    fetchAttendance();
  }, [attendanceId]);

  if (!attendance) {
    return <div>Loading attendance details...</div>;
  }

  return (
    <div>
      <h2>Attendance Details</h2>
      <p>Employee Name: {attendance.userDTO.fullName}</p>
      <p>Check In: {attendance.checkIn}</p>
      <p>Check Out: {attendance.checkOut}</p>
      <p>hasCheckIn: {attendance.hasCheckIn ? "Checked In" : "Not Checked In"}</p>
      <p>hasCheckOut: {attendance.hasCheckOut ? "Checked Out" : "Not Checked Out"}</p>
    </div>
  );
};

export default ViewAtt;
