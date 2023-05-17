import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const ViewLeaveRequest = ({ leaveId }) => {
  const [leaveRequest, setLeaveRequest] = useState(null);

  useEffect(() => {
    const fetchLeaveRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/leave-requests/${leaveId}`
        );
        if (response?.status === 200) {
          setLeaveRequest(response.data);
        }
      } catch (error) {
        console.log(error);
        notifications.show({
          id: "error-message",
          withCloseButton: true,
          autoClose: 3000,
          message: "Failed to fetch leave request details",
          color: "red",
          loading: false,
        });
      }
    };

    fetchLeaveRequest();
  }, [leaveId]);

  if (!leaveRequest) {
    return <div>Loading leave request details...</div>;
  }

  return (
    <div>
      <h2>Leave Request Details</h2>
      <p>Start Date: {leaveRequest.startDate}</p>
      <p>End Date: {leaveRequest.endDate}</p>
      <p>Reason: {leaveRequest.reason}</p>
      <p>Status: {leaveRequest.status}</p>
      <p>Created At: {leaveRequest.createdAt}</p>
    </div>
  );
};

export default ViewLeaveRequest;
