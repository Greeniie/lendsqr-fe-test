import { renderHook, waitFor } from "@testing-library/react";
import { useAllUsers } from "./useAllUsers";

global.fetch = jest.fn();

describe("useAllUsers", () => {
  test("fetches users successfully", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, username: "tejiri" }],
    });

    const { result } = renderHook(() => useAllUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users.length).toBe(1);
    expect(result.current.error).toBeNull();
  });

  test("handles fetch error", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useAllUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to fetch users");
  });
});
