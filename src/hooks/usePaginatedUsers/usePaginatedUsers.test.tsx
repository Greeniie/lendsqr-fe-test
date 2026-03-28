import { renderHook, waitFor } from "@testing-library/react";
import { usePaginatedUsers } from "./usePaginatedUsers";

global.fetch = jest.fn();

const mockUsers = [
  {
    id: 1,
    organization: "Org1",
    username: "tejiri",
    email: "test@mail.com",
    phoneNumber: 123,
    dateJoined: "2023-01-01",
    status: "Active",
  },
  {
    id: 2,
    organization: "Org2",
    username: "john",
    email: "john@mail.com",
    phoneNumber: 456,
    dateJoined: "2023-01-02",
    status: "Inactive",
  },
];

describe("usePaginatedUsers", () => {
  test("returns paginated users", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    const { result } = renderHook(() => usePaginatedUsers(1, 1, {}));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users.length).toBe(1);
    expect(result.current.total).toBe(2);
  });

  test("filters users by username", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    const { result } = renderHook(() =>
      usePaginatedUsers(1, 10, { username: "tejiri" }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users.length).toBe(1);
    expect(result.current.users[0].username).toBe("tejiri");
  });

  test("handles error", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => usePaginatedUsers(1, 10, {}));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to fetch users");
  });
});
