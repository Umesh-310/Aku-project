import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
// import { postRequest } from "../../utils/helpers/helper.js";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => ({
      email:
        /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g.test(
          values.email
        ) !== true
          ? "Invalid Email"
          : values.email === ""
          ? "Email is required"
          : null,
      password: values.password === "" ? "Password is required" : null,
    }),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/authenticate",
        values
      );
      if (response?.status === 200) {
        const { token, role, userId } = response.data;
        // Store token, role, and userId in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        navigate("/admin");
        notifications.show({
          id: "success-message",
          withCloseButton: true,
          autoClose: 3000,
          message: `Successfully Login 🎉🎉`,
          color: "green",
          loading: false,
        });
        navigate("/admin", { replace: true });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      notifications.show({
        id: "error-message",
        withCloseButton: true,
        autoClose: 3000,
        message: `${error?.response?.data?.message}`,
        color: "red",
        loading: false,
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container my={90} sx={{ margin: "auto 0" }}>
        <img src={"/forget.jpg"} width={400} />
      </Container>
      <Container my={90} sx={{ margin: "auto 0" }}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 700,
          })}
        >
          Welcome back !
        </Title>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          sx={{ width: "400px" }}
          radius="md"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email Id"
              placeholder="Email Id"
              type="text"
              mt="md"
              name="email"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              name="password"
              withAsterisk
              {...form.getInputProps("password")}
            />
            <Button fullWidth mt="xl" type="submit">
              Log In
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
