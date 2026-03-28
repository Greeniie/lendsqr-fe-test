import React, { useState, useRef, useEffect } from "react";
import styles from "./userstable.module.scss";
import filter from "../../assets/icons/filter-results-button.svg";
import ellipse from "../../assets/icons/ic-more-vert-18px.svg";
import next from "../../assets/icons/next.svg";
import prev from "../../assets/icons/prev.svg";
import view from "../../assets/icons/np_view_1214519_000000 1.svg";
import blacklist from "../../assets/icons/np_delete-friend_3248001_000000 1.svg";
import activate from "../../assets/icons/np_user_2995993_000000 1.png";
import { useNavigate } from "react-router-dom";

import { type User } from "../../hooks/allUsers/useAllUsers";

interface Props {
  users: User[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  total: number;
  filters: {
    organization?: string;
    username?: string;
    email?: string;
    date?: string;
    phoneNumber?: number;
    status?: string;
  };
  setFilters: (filters: {
    organization?: string;
    username?: string;
    email?: string;
    date?: string;
    phoneNumber?: number;
    status?: string;
  }) => void;
}

const UsersTable: React.FC<Props> = ({
  users,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  total,
  filters,
  setFilters,
}) => {
  const navigate = useNavigate();
  const [localFilters, setLocalFilters] = useState(filters);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [actionMenuInfo, setActionMenuInfo] = useState<{
    userId: number | null;
    x: number;
    y: number;
  }>({
    userId: null,
    x: 0,
    y: 0,
  });

  const actionRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (actionRef.current && !actionRef.current.contains(e.target as Node)) {
        setActionMenuInfo({
          userId: null,
          x: 0,
          y: 0,
        });
      }

      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPages = Math.ceil(total / pageSize);

  const headers = [
    "Organization",
    "Username",
    "Email",
    "Phone number",
    "Date joined",
    "Status",
  ];

  const getVisiblePages = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);
    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push("...");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const organizations = Array.from(
    new Set(users.map((user) => user.organization)),
  );

  const statuses = Array.from(new Set(users.map((user) => user.status)));

  return (
    <div className={styles.container}>
      <div className={styles.tablecontainer}>
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>
                  <div className={styles.headerone}>
                    <div>{header}</div>
                    <button
                      className={styles.button}
                      onClick={() => setShowFilterMenu((prev) => !prev)}
                    >
                      <img src={filter} alt="filter" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  {`${new Date(user.dateJoined).toLocaleDateString("en-NG", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })} ${new Date(user.dateJoined).toLocaleTimeString("en-NG", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}`}
                </td>
                <td>
                  <span className={styles[user.status.toLowerCase()]}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      const rect = (
                        e.currentTarget as HTMLElement
                      ).getBoundingClientRect();

                      setActionMenuInfo({
                        userId: user.id,
                        x: rect.right,
                        y: rect.bottom,
                      });
                    }}
                  >
                    <img src={ellipse} alt="more" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showFilterMenu && (
          <div className={styles.filtermenu} ref={filterRef}>
            <div className={styles.label}>Organization</div>
            <select
              value={localFilters.organization || ""}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  organization: e.target.value,
                })
              }
            >
              <option value="">Organization</option>
              {organizations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>

            <div className={styles.label}>Username</div>

            <input
              placeholder="Username"
              value={localFilters.username || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, username: e.target.value })
              }
            />
            <div className={styles.label}>Email</div>

            <input
              placeholder="Email"
              value={localFilters.email || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, email: e.target.value })
              }
            />

            <div className={styles.label}>Date</div>

            <input
              type="date"
              value={localFilters.date || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, date: e.target.value })
              }
            />

            <div className={styles.label}>Phone Number</div>

            <input
              placeholder="Phone Number"
              value={localFilters.phoneNumber || ""}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  phoneNumber: Number(e.target.value),
                })
              }
            />

            <div className={styles.label}>Status</div>

            <select
              value={localFilters.status || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, status: e.target.value })
              }
            >
              <option value="">Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <div className={styles.filterActions}>
              <button
                className={styles.reset}
                onClick={() => {
                  setLocalFilters({});
                  setFilters({});
                }}
              >
                Reset
              </button>

              <button
                className={styles.filter}
                onClick={() => {
                  setFilters(localFilters);
                  setCurrentPage(1);
                  setShowFilterMenu(false);
                }}
              >
                Filter
              </button>
            </div>
          </div>
        )}
        {actionMenuInfo.userId !== null &&
          (() => {
            const clickedUser = users.find(
              (u) => u.id === actionMenuInfo.userId,
            );
            if (!clickedUser) return null;

            return (
              <div
                className={styles.menu}
                ref={actionRef}
                style={{
                  position: "fixed",
                  top: actionMenuInfo.y,
                  left: actionMenuInfo.x - 180,
                }}
              >
                <div
                  className={styles.menuItem}
                  onClick={() => {
                    localStorage.setItem(
                      "selectedUser",
                      JSON.stringify(clickedUser),
                    );
                    navigate(`/users/${clickedUser.id}`);
                  }}
                >
                  <img src={view} alt="view" />
                  <div>View Details</div>
                </div>
                <div className={styles.menuItem}>
                  <img src={blacklist} alt="blacklist user" />
                  <div>Blacklist User</div>
                </div>
                <div className={styles.menuItem}>
                  <img src={activate} alt="activate user" />
                  <div>Activate User</div>
                </div>
              </div>
            );
          })()}
      </div>

      <div className={styles.footer}>
        <div>
          Showing
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[20, 30, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>{" "}
          out of {total}
        </div>

        <div className={styles.pagination}>
          <button
            className={styles.footerbutton}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <img src={prev} alt="prev" />
          </button>

          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <span key={index} className={styles.ellipsis}>
                ...
              </span>
            ) : (
              <button
                key={page}
                className={
                  currentPage === page ? styles.active : styles.inactive
                }
                onClick={() => setCurrentPage(page as number)}
              >
                {page}
              </button>
            ),
          )}

          <button
            className={styles.footerbutton}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <img src={next} alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
