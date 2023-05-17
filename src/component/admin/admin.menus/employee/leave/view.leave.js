import { Table, Button, Modal } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";
import ViewLeaveRequest from "./ViewLeaveRequest";

const ViewLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Fetch leave requests from the server
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8080/leave-requests");
      if (response?.status === 200) {
        setLeaveRequests(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Open the view modal
  const openViewModal = (leaveId) => {
    setSelectedLeaveId(leaveId);
    setViewModalOpen(true);
  };

  // Close the view modal
  const closeViewModal = () => {
    setSelectedLeaveId(null);
    setViewModalOpen(false);
  };

  // Render table rows
  const rows = leaveRequests.map((leaveRequest) => (
    <tr key={leaveRequest.id}>
      <td>{leaveRequest.startDate}</td>
      <td>{leaveRequest.endDate}</td>
      <td>{leaveRequest.reason}</td>
      <td>{leaveRequest.status}</td>
      <td>
        <Button onClick={() => openViewModal(leaveRequest.id)}>View</Button>
      </td>
    </tr>
  ));

  // Fetch leave requests on component mount
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <>
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      {/* View Modal */}
      <Modal
        opened={viewModalOpen}
        onClose={closeViewModal}
        title="View Leave Request"
      >
        <ViewLeaveRequest leaveId={selectedLeaveId} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <Button variant="outline" onClick={closeViewModal}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ViewLeave;