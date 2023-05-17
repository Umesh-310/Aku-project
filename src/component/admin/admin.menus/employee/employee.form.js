import { TextInput, PasswordInput, Textarea, Select, Button, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      contactPhone: "",
      password: "",
      address: "",
      jobTitle: "",
      role: ""
    },
    validate: (values) => ({
      fullName: values.fullName === "" ? "Full name is required" : null,
      password: values.password === "" ? "Password is required" : null,
      jobTitle: values.jobTitle === "" ? "Job title is required" : null,
      role: values.role === "" ? "Role is required" : null,
      contactPhone:
        values.contactPhone === "" ||
        !/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(values.contactPhone)
          ? "Invalid phone number"
          : null,
      email:
        values.email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ? "Invalid email"
          : null
    })
  });

  // Handle Submit Form
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/users", values);
      if (response?.status === 200) {
        notifications.show({
          id: "success-message",
          withCloseButton: true,
          autoClose: 3000,
          message: `Successfully Login`,
          color: "green",
          loading: false
        });
        form.reset();
      }
    } catch (error) {
      console.log(error);
      notifications.show({
        id: "error-message",
        withCloseButton: true,
        autoClose: 3000,
        message: `${error.response.data.message}`,
        color: "red",
        loading: false
      });
    }
  };

  const options = [
    { label: "HR", value: "HR" },
    { label: "MANAGER", value: "MANAGER" },
    { label: "EMPLOYEE", value: "EMPLOYEE" }
  ];

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Full Name"
          placeholder="Full Name"
          type="text"
          name="fullName"
          required
          {...form.getInputProps("fullName")}
        />
        <TextInput
          label="Phone number"
          placeholder="Phone number"
          type="text"
          mt="md"
          name="contactPhone"
          required
          {...form.getInputProps("contactPhone")}
        />
        <TextInput
          label="Email Id"
          placeholder="Email Id"
          type="email"
          mt="md"
          name="email"
          required
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          name="password"
          required
          {...form.getInputProps("password")}
        />
        <Divider style={{ marginTop: "20px" }} size={1} />
        <TextInput
          label="Job Title"
          placeholder="Job Title"
          type="text"
          mt="md"
          name="jobTitle"
          required
          {...form.getInputProps("jobTitle")}
        />
        
        <Divider style={{ marginTop: "20px" }} size={1} />
        <Textarea
          label="Address"
          placeholder="Address"
          type="textarea"
          name="address"
          mt="md"
          required
          {...form.getInputProps("address")}
        />
        <Select
          label="Select Role"
          placeholder="Choose Role"
          data={options}
          name="role"
          required
          {...form.getInputProps("role")}
          mt={20}
        />
        <Divider style={{ marginTop: "20px" }} size={1} />
        <Button fullWidth mt="xl" type="submit">
          Add Employee
        </Button>
      </form>
    </>
);
};

export default EmployeeForm;    