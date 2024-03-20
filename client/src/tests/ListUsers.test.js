import { render, screen } from "@testing-library/react";
import ListUsers from "../components/ListUsers";

test("Registered Users table renders", () => {
  render(<ListUsers />);

  expect(screen.getByTitle("Registered Users")).toBeInTheDocument();
});
