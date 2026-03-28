import { useEffect, useState } from "react";
import { type User } from "../allUsers/useAllUsers";

interface Filters {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: string;
}

export const usePaginatedUsers = (
  page: number,
  limit: number,
  filters: Filters = {},
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/users"
      : "/users.json"; // production

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch users.");

        let allUsers: User[] | { users: User[] } = await res.json();
        const usersArray: User[] = Array.isArray(allUsers)
          ? allUsers
          : allUsers.users;

        // Filter logic remains unchanged
        const filteredUsers = usersArray.filter((user) => {
          return (
            (!filters.organization ||
              user.organization.toLowerCase() ===
                filters.organization.toLowerCase()) &&
            (!filters.username ||
              user.username
                .toLowerCase()
                .includes(filters.username.toLowerCase())) &&
            (!filters.email ||
              user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
            (!filters.status ||
              user.status.toLowerCase() === filters.status.toLowerCase()) &&
            (!filters.phoneNumber ||
              user.phoneNumber === Number(filters.phoneNumber)) &&
            (!filters.date || user.dateJoined.startsWith(filters.date))
          );
        });

        // Pagination
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginated = filteredUsers.slice(start, end);

        if (isMounted) {
          setUsers(paginated);
          setTotal(filteredUsers.length);
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, [page, limit, JSON.stringify(filters)]);

  return { users, total, loading, error };
};
