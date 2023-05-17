import { useState } from "react";
import axios from "axios";
import { Button, TextInput, Textarea } from "@mantine/core";

const AddLeave = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const leaveRequestData = {
      user: {
        userId: userId,
      },
      startDate: startDate,
      endDate: endDate,
      reason: reason,
      status: "PENDING",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/leave-requests",
        leaveRequestData
      );
      if (response?.status === 201) {
        
        // Reset form fields
        setStartDate("");
        setEndDate("");
        setReason("");
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div>
      <h2>Add Leave Request</h2>
      <div>
        <label htmlFor="start-date">Start Date:</label>
        <TextInput
          id="start-date"
          value={startDate}
          onChange={handleStartDateChange}
          placeholder="YYYY-MM-DD"
        />
      </div>
      <div>
        <label htmlFor="end-date">End Date:</label>
        <TextInput
          id="end-date"
          value={endDate}
          onChange={handleEndDateChange}
          placeholder="YYYY-MM-DD"
        />
      </div>
      <div>
        <label htmlFor="reason">Reason:</label>
        <Textarea
          id="reason"
          value={reason}
          onChange={handleReasonChange}
          placeholder="Enter your reason for leave"
          minRows={3}
        />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddLeave;
