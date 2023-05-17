import { Table, Button, Modal, Text, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateEmployee = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

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

  // Open the update modal
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  // Close the update modal
  const closeUpdateModal = () => {
    setSelectedUser(null);
    setUpdateModalOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${selectedUser.userId}`,
        selectedUser
      );
      if (response?.status === 200) {
        // Refresh the user list
        fetchUsers();
        // Close the update modal
        setUpdateModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
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
        <Button onClick={() => openUpdateModal(user)}>Update</Button>
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

      {/* Update Modal */}
      <Modal
        opened={updateModalOpen}
        onClose={closeUpdateModal}
        title="Update Employee"
      >
        {selectedUser && (
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Full Name"
              value={selectedUser.fullName}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  fullName: event.target.value,
                })
              }
              required
            />
            <TextInput
              label="Email"
              value={selectedUser.email}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  email: event.target.value,
                })
              }
              required
            />
            <TextInput
              label="Contact Phone"
              value={selectedUser.contactPhone}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  contactPhone: event.target.value,
                })
              }
            />
            <TextInput
              label="Address"
              value={selectedUser.address}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  address: event.target.value,
                })
              }
            />
            <TextInput
              label="Job Title"
              value={selectedUser.jobTitle}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  jobTitle: event.target.value,
                })
              }
            />
            <TextInput
              label="Role"
              value={selectedUser.role}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  role: event.target.value,
                })
              }
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

export default UpdateEmployee;
