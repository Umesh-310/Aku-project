import { useForm } from "@mantine/form";
import {
  TextInput,
  Group,
  Button,
  Divider,
  Radio,
  Textarea,
  Select,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getRequest } from "../../utils/helpers/helper";
import axios from "axios"

const Profile = () => {
  const navigate = useNavigate();
  const [isDisabled, setisDisabled] = useState(true);
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState({});

  // fetch user
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/" + userId);
      if(response){
        setUsers(response?.data?.user)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const form = useForm({
    initialValues: {
      fullName: users?.fullName,
      email: users?.email,
      contactPhone: users?.contactPhone,
      address: users?.address,
      jobTitle: users?.jobTitle,
      role: users?.role
    },

    validate: (values) => ({
      fullName: values.fullName == "" ? "Fullname is required" : null,
      password: values.password == "" ? "Password is required" : null,
      jobTitle: values.jobTitle == "" ? "jobTitle is required" : null,
      department: values.department == "" ? "department is required" : null,
      role: values.role == "" ? "role is required" : null,
      contactPhone:
        values.contactPhone == ""
          ? "Phone number is required"
          : /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(
              values.contactPhone
            ) !== true
          ? "Invalid Phone number"
          : null,
      email:
        /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g.test(
          values.email
        ) !== true
          ? "Invalid Email"
          : values.email == ""
          ? "Email is required"
          : null,
    }),
  });

  // // Handle Submit Form
  // const handleSubmit = async (values) => {
  //   console.log(values);
  // };

  const options = [
    { label: "HR", value: "HR" },
    { label: "MANAGER", value: "MANAGER" },
    { label: "EMPLOYEE", value: "EMPLOYEE" },
  ];

  return (
    <>
      <form>
        <TextInput
          label="Full Name"
          placeholder="Full Name"
          type="text"
          name="fullName"
          withAsterisk
          value={form.values.fullName}
          {...form.getInputProps("fullName")}
          disabled={isDisabled}
        />
        <TextInput
          label="Phone number"
          placeholder="Phone number"
          type="text"
          mt="md"
          name="contactPhone"
          withAsterisk
          value={form.values.contactPhone}
          {...form.getInputProps("contactPhone")}
          disabled={isDisabled}
        />
        <TextInput
          label="Email Id"
          placeholder="Email Id"
          type="text"
          mt="md"
          name="email"
          withAsterisk
          value={form.values.email}
          {...form.getInputProps("email")}
          disabled={isDisabled}
        />

        <Divider style={{ marginTop: "20px" }} size={1} />

        <TextInput
          label="jobTitle"
          placeholder="jobTitle"
          type="text"
          mt="md"
          name="jobTitle"
          value={form.values.jobTitle}
          withAsterisk
          {...form.getInputProps("jobTitle")}
          disabled={isDisabled}
        />
        <TextInput
          label="department"
          placeholder="department"
          type="text"
          mt="md"
          name="department"
          value={form.values.department}
          withAsterisk
          {...form.getInputProps("department")}
          disabled={isDisabled}
        />

        <Divider style={{ marginTop: "20px" }} size={1} />

        <Textarea
          label="Address"
          placeholder="Address"
          type="textarea"
          name="address"
          mt="md"
          value={form.values.address}
          withAsterisk
          onChange={(e) => {
            form.getInputProps("address").onChange(e);
          }}
          disabled={isDisabled}
        />

        <Select
          label="Select Role"
          placeholder="Choose Role"
          data={options}
          name="role"
          value={form.values.role}
          withAsterisk
          onChange={(e) => {
            form.getInputProps("role").onChange(e);
          }}
          mt={20}
          disabled={isDisabled}
        />

        <Divider style={{ marginTop: "20px" }} size={1} />
        {/* <Group>
          {" "}
          <Button mt="xl" onClick={handleDisable} disabled={!isDisabled}>
            Edit Profile
          </Button>
          {!isDisabled ? (
            <>
              <Button mt="xl" type="submit" variant="gradient" color="green">
                Save Changes
              </Button>
              <Button
                mt="xl"
                variant="gradient"
                gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                onClick={() => setisDisabled(true)}
              >
                Discard Changes
              </Button>
            </>
          ) : null}
        </Group> */}
      </form>
    </>
  );
};

export default Profile;
