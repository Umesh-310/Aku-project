import { Table, Button, Modal, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";
import ViewUser from "./ViewUser";

const ViewEmploy = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      if (response?.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Open the view modal
  const openViewModal = (userId) => {
    setSelectedUserId(userId);
    setViewModalOpen(true);
  };

  // Close the view modal
  const closeViewModal = () => {
    setSelectedUserId(null);
    setViewModalOpen(false);
  };

  // Render table rows
  const rows = users.map((user) => (
    <tr key={user.userId}>
      <td>{user.fullName}</td>
      <td>{user.email}</td>
      <td>{user.contactPhone}</td>
      <td>{user.jobTitle}</td>
      <td>{user.role}</td>
      <td>
        <Button onClick={() => openViewModal(user.userId)}>View</Button>
      </td>
    </tr>
  ));

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th>Full name</th>
            <th>Email</th>
            <th>Contact Phone</th>
            <th>Job Title</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      {/* View Modal */}
      <Modal
        opened={viewModalOpen}
        onClose={closeViewModal}
        title="View Employee"
      >
        <ViewUser userId={selectedUserId} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <Button variant="outline" onClick={closeViewModal}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ViewEmploy;
