import { Container } from "@mantine/core";
import EmployeeForm from "./employee.form";
const AddEmployee = () => {
  return (
    <Container style={{ border: "1px solid gray" }} p={30} mt={30} mb={30}>
      <EmployeeForm />
    </Container>
  );
};

export default AddEmployee;
