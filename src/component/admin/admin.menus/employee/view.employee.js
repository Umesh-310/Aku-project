import { Table, Button, Modal, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewEmployee = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

// Delete a user
const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:8080/users/${userId}`);
    if (response?.status === 200) {
      // Refresh the user list
      fetchUsers();
      // Close the delete modal
      setDeleteModalOpen(false);
    }
  } catch (error) {
    console.log(error);
  }
};


  // Open the delete modal
  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setDeleteModalOpen(true);
  };

  // Close the delete modal
  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setDeleteModalOpen(false);
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
        <Button onClick={() => openDeleteModal(user.userId)}>Delete</Button>
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

      {/* Delete Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Employee"
      >
        <Text size="sm">
          Are you sure you want to delete this employee?
        </Text>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <Button variant="outline" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteUser(selectedUserId)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ViewEmployee;
