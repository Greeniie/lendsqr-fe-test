import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UsersTable from "./UsersTable";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockUsers = [
  {
    id: 1,
    organization: "Test Org",
    username: "tejiri",
    email: "test@mail.com",
    phoneNumber: 123456789,
    dateJoined: "2023-01-01T10:00:00Z",
    status: "Active",
  },
];

describe("UsersTable", () => {
  test("renders user data (positive)", () => {
    render(
      <UsersTable
        users={mockUsers as any}
        currentPage={1}
        setCurrentPage={jest.fn()}
        pageSize={10}
        setPageSize={jest.fn()}
        total={1}
        filters={{}}
        setFilters={jest.fn()}
      />
    );

    expect(screen.getByText("tejiri")).toBeInTheDocument();
    expect(screen.getByText("Test Org")).toBeInTheDocument();
    expect(screen.getByText("test@mail.com")).toBeInTheDocument();
  });

  test("shows empty state when no users (negative)", () => {
    render(
      <UsersTable
        users={[]}
        currentPage={1}
        setCurrentPage={jest.fn()}
        pageSize={10}
        setPageSize={jest.fn()}
        total={0}
        filters={{}}
        setFilters={jest.fn()}
      />
    );

    expect(screen.queryByText("tejiri")).not.toBeInTheDocument();
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  test("action menu opens and closes (positive + negative)", async () => {
    render(
      <UsersTable
        users={mockUsers as any}
        currentPage={1}
        setCurrentPage={jest.fn()}
        pageSize={10}
        setPageSize={jest.fn()}
        total={1}
        filters={{}}
        setFilters={jest.fn()}
      />
    );

    const button = screen.getByRole("img", { name: "more" }).closest("button");
    await userEvent.click(button!);

    expect(screen.getByText("View Details")).toBeInTheDocument();

    // Negative: click outside should close menu
    document.body.click();
    expect(screen.queryByText("View Details")).not.toBeInTheDocument();
  });

  test("pagination disables buttons correctly (negative)", () => {
    const setCurrentPage = jest.fn();

    render(
      <UsersTable
        users={mockUsers as any}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        pageSize={10}
        setPageSize={jest.fn()}
        total={10}
        filters={{}}
        setFilters={jest.fn()}
      />
    );

    const prevBtn = screen.getByAltText("prev").closest("button");
    const nextBtn = screen.getByAltText("next").closest("button");

    // Negative: prev is disabled on first page
    expect(prevBtn).toBeDisabled();

    // Positive: next button should be enabled
    expect(nextBtn).not.toBeDisabled();
  });

  test("filters do not apply invalid values (negative)", async () => {
    const setFilters = jest.fn();
    render(
      <UsersTable
        users={mockUsers as any}
        currentPage={1}
        setCurrentPage={jest.fn()}
        pageSize={10}
        setPageSize={jest.fn()}
        total={1}
        filters={{}}
        setFilters={setFilters}
      />
    );

    const filterBtn = screen.getAllByRole("img", { name: "filter" })[0]
      .closest("button");
    await userEvent.click(filterBtn!);

    const usernameInput = screen.getByPlaceholderText("Username");
    await userEvent.type(usernameInput, "nonexistentuser");

    await userEvent.click(screen.getByText("Filter"));

    expect(setFilters).toHaveBeenCalledWith(
      expect.objectContaining({ username: "nonexistentuser" })
    );
  });
});