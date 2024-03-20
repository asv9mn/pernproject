import { render, screen } from "@testing-library/react";
import RegisterUser from "../components/RegisterUser";

test("Check if registration form renders", () => {
  render(<RegisterUser />);

  expect(screen.getByTitle("Registration Form")).toBeInTheDocument();
  expect(screen.getByLabelText("Full Name:")).toBeInTheDocument();
  expect(screen.getByLabelText("Date of Birth:")).toBeInTheDocument();
});

test("Check if Error Message is NOT rendered by default", () => {
  render(<RegisterUser />);

  expect(screen.queryByTitle("Error Message")).not.toBeInTheDocument();
});
