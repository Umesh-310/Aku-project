import { Table, Button, Modal, Text, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

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

  // Open the update modal
  const openUpdateModal = (leaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
    setUpdateModalOpen(true);
  };

  // Close the update modal
  const closeUpdateModal = () => {
    setSelectedLeaveRequest(null);
    setUpdateModalOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/leave-requests/${selectedLeaveRequest.id}`,
        selectedLeaveRequest
      );
      if (response?.status === 200) {
        // Refresh the leave request list
        fetchLeaveRequests();
        // Close the update modal
        setUpdateModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Render table rows
  const rows = leaveRequests.map((leaveRequest) => (
    <tr key={leaveRequest.id}>
      <td>{leaveRequest.user.fullName}</td>
      <td>{leaveRequest.startDate}</td>
      <td>{leaveRequest.endDate}</td>
      <td>{leaveRequest.reason}</td>
      <td>{leaveRequest.status}</td>
      <td>
        <Button onClick={() => openUpdateModal(leaveRequest)}>Update</Button>
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
            <th>User</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      {/* Update Modal */}
      <Modal
        opened={updateModalOpen}
        onClose={closeUpdateModal}
        title="Update Leave Request"
      >
        {selectedLeaveRequest && (
          <form onSubmit={handleSubmit}>
            <Text>Leave Request ID: {selectedLeaveRequest.id}</Text>
            <Text>User: {selectedLeaveRequest.user.fullName}</Text>
            <TextInput
              label="Start Date"
              type="date"
              value={selectedLeaveRequest.startDate}
              onChange={(event) =>
                setSelectedLeaveRequest({
                  ...selectedLeaveRequest,
                  startDate: event.target.value,
                })
              }
              required
            />
            <TextInput
              label="End Date"
              type="date"
              value={selectedLeaveRequest.endDate}
              onChange={(event) =>
                setSelectedLeaveRequest({
                  ...selectedLeaveRequest,
                  endDate: event.target.value,
                })
              }
              required
            />
            <TextInput
              label="Reason"
              value={selectedLeaveRequest.reason}
              onChange ={(event) =>
                setSelectedLeaveRequest({
                  ...selectedLeaveRequest,
                  reason: event.target.value,
                })
              }
              required
            />
            <TextInput
              label="Denied Reason"
              value={selectedLeaveRequest.deniedReason}
              onChange={(event) =>
                setSelectedLeaveRequest({
                  ...selectedLeaveRequest,
                  deniedReason: event.target.value,
                })
              }
            />
            <TextInput
              label="Status"
              value={selectedLeaveRequest.status}
              onChange={(event) =>
                setSelectedLeaveRequest({
                  ...selectedLeaveRequest,
                  status: event.target.value,
                })
              }
              required
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button variant="outline" onClick={closeUpdateModal}>
                Cancel
              </Button>
              <Button type="submit" style={{ marginLeft: "10px" }}>
                Update
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default UpdateLeave;