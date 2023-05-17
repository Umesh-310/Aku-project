import { Table, Button, Modal, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";
import ViewUser from "./ViewAtt";

const ViewAttendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Fetch attendances from the server
  const fetchAttendances = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/attendance");
      if (response?.status === 200) {
        setAttendances(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Open the view modal
  const openViewModal = (attendanceId) => {
    setSelectedAttendanceId(attendanceId);
    setViewModalOpen(true);
  };

  // Close the view modal
  const closeViewModal = () => {
    setSelectedAttendanceId(null);
    setViewModalOpen(false);
  };

  // Render table rows
const rows = attendances.map((attendance) => (
    <tr key={attendance.attendanceId}>
      <td>{attendance.userDTO.fullName}</td>
      <td>{attendance.checkIn}</td>
      <td>{attendance.checkOut}</td>
      <td>{attendance.hasCheckIn ? "Checked In" : "Not Checked In"}</td>
      <td>{attendance.hasCheckOut ? "Checked Out" : "Not Checked Out"}</td>
      <td>
        <Button onClick={() => openViewModal(attendance.attendanceId)}>
          View
        </Button>
      </td>
    </tr>
  ));
  

  // Fetch attendances on component mount
  useEffect(() => {
    fetchAttendances();
  }, []);

  return (
    <>
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Has Check In</th>
            <th>Has Check Out</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      {/* View Modal */}
      <Modal
        opened={viewModalOpen}
        onClose={closeViewModal}
        title="View Attendance"
      >
        <ViewUser attendanceId={selectedAttendanceId} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <Button variant="outline" onClick={closeViewModal}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ViewAttendance;
