import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const ViewUser = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        if (response?.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.log(error);
        notifications.show({
          id: "error-message",
          withCloseButton: true,
          autoClose: 3000,
          message: "Failed to fetch user details",
          color: "red",
          loading: false
        });
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Full Name: {user.fullName}</p>
      <p>Email: {user.email}</p>
      <p>Contact Phone: {user.contactPhone}</p>
      <p>Address: {user.address}</p>
      <p>Job Title: {user.jobTitle}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default ViewUser;
